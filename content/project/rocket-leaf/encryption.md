---
title: 连接信息加密存储
description: AES-256-GCM + SHA-256 字段级派生密钥的实现，以及如何在不破坏兼容性的前提下为历史明文数据做透明迁移。
---

## 为什么要加密

Rocket-Leaf 把用户的连接配置（含 `AccessKey` / `SecretKey`）持久化到本地 JSON 文件：

```
$UserConfigDir/rocket-leaf/connections.json
```

如果裸存明文，会有这些风险：

- 本地备份/同步工具（如 iCloud、OneDrive）可能无意中把密钥上传
- 有人借用电脑时随手翻一下就能看到生产集群凭证
- 误把配置文件 commit 进 git（发生过无数次的经典事故）

所以需要在**写盘**时加密、在**读取**时解密，让内存里始终是明文、磁盘上始终是密文。

## 密钥管理

加密总要有密钥，那密钥放哪儿？三种常见思路：

| 方案 | 优点 | 缺点 |
| ---- | ---- | ---- |
| 硬编码 | 简单 | 反编译即可拿到 |
| 系统 Keychain / Credential Manager | 安全 | 跨平台兼容复杂 |
| 本地密钥文件（权限 0600） | 简单 + 跨平台 | 有本机访问权的人仍可读 |

Rocket-Leaf 选了**本地密钥文件**方案：用户配置目录下的 `secret.key` 保存一个 256 位的随机主密钥，首次运行时生成：

```go
const keyFileName = "secret.key"

func getOrCreateKey(configDir string) ([]byte, error) {
    keyPath := filepath.Join(configDir, keyFileName)

    data, err := os.ReadFile(keyPath)
    if err == nil {
        decoded, decErr := base64.StdEncoding.DecodeString(strings.TrimSpace(string(data)))
        if decErr == nil && len(decoded) == 32 {
            return decoded, nil
        }
    }

    // 生成新密钥
    key := make([]byte, 32)
    if _, err := io.ReadFull(rand.Reader, key); err != nil {
        return nil, fmt.Errorf("生成密钥失败: %w", err)
    }

    if err := os.MkdirAll(configDir, 0o755); err != nil {
        return nil, fmt.Errorf("创建密钥目录失败: %w", err)
    }

    encoded := base64.StdEncoding.EncodeToString(key)
    if err := os.WriteFile(keyPath, []byte(encoded), 0o600); err != nil {
        return nil, fmt.Errorf("保存密钥失败: %w", err)
    }
    return key, nil
}
```

几个关键点：

1. **`crypto/rand`** 而不是 `math/rand`：前者是加密安全随机源
2. **256 位（32 字节）**：AES-256 的标准密钥长度
3. **Base64 存储**：便于调试时查看、避免文件里出现奇怪字节
4. **文件权限 `0600`**：只有当前用户可读写

## 主密钥的初始化时机

注意 `globalKey` 用 `sync.Once` 保护，确保全程只初始化一次：

```go
var (
    globalKey     []byte
    globalKeyOnce sync.Once
    globalKeyErr  error
)

func InitKey(configDir string) error {
    globalKeyOnce.Do(func() {
        globalKey, globalKeyErr = getOrCreateKey(configDir)
    })
    return globalKeyErr
}
```

在 `main.go` 的 `init()` 里最早被调用：

```go
func init() {
    configDir, err := os.UserConfigDir()
    if err == nil {
        if initErr := crypto.InitKey(filepath.Join(configDir, "rocket-leaf")); initErr != nil {
            log.Printf("[main] 初始化加密密钥失败: %v", initErr)
        }
    }
    // 之后才实例化 service
    settingsService = service.NewSettingsService()
    connectionService = service.NewConnectionService(settingsService)
    // ...
}
```

**顺序很重要**：service 启动时会从文件加载连接配置，而加载过程需要解密，所以密钥必须先就位。

## 字段级派生密钥

直接用主密钥加密所有字段并不是最佳实践。Rocket-Leaf 用 SHA-256 **从主密钥派生每个字段的专属密钥**：

```go
func deriveFieldKey(masterKey []byte, field string) []byte {
    h := sha256.New()
    h.Write(masterKey)
    h.Write([]byte(field))
    return h.Sum(nil)
}
```

调用时：

```go
key := deriveFieldKey(globalKey, "accessKey") // AccessKey 用的密钥
key := deriveFieldKey(globalKey, "secretKey") // SecretKey 用的密钥
```

派生密钥的好处：

1. **语义隔离**：即使 `accessKey` 字段的某条密文被破解，也不会影响 `secretKey` 字段
2. **避免密钥复用**：GCM 模式对同一个 `(key, nonce)` 组合重复使用会导致严重的安全漏洞，派生密钥让不同字段使用完全不同的 key，降低 nonce 冲突的影响
3. **实现简单**：相比 HKDF，SHA-256 拼接就能满足本地保护场景的需要

::note{title="和 HKDF 的差异"}
严格意义上 HKDF（RFC 5869）才是"派生密钥"的标准做法：`HKDF = Extract + Expand`，比简单的 `SHA256(master || info)` 更严谨。但对于桌面应用**不需要抵抗高等级攻击**的场景，这种简化是可以接受的。如果需要升级，换成 `golang.org/x/crypto/hkdf` 只需改几行。
::

## AES-256-GCM 加解密

GCM（Galois/Counter Mode）是目前主流的 AEAD 模式，同时提供**加密 + 完整性验证**。代码：

```go
const encryptedPrefix = "ENC:"

func Encrypt(plaintext string, field string) (string, error) {
    if plaintext == "" {
        return "", nil  // 空字符串不加密，直接返回
    }
    if globalKey == nil {
        return "", errors.New("加密密钥未初始化")
    }

    key := deriveFieldKey(globalKey, field)

    block, err := aes.NewCipher(key)
    if err != nil {
        return "", fmt.Errorf("创建加密器失败: %w", err)
    }
    gcm, err := cipher.NewGCM(block)
    if err != nil {
        return "", fmt.Errorf("创建 GCM 失败: %w", err)
    }

    nonce := make([]byte, gcm.NonceSize())
    if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
        return "", fmt.Errorf("生成 nonce 失败: %w", err)
    }

    // gcm.Seal 会把 nonce 拼到密文前面
    ciphertext := gcm.Seal(nonce, nonce, []byte(plaintext), nil)
    return encryptedPrefix + base64.StdEncoding.EncodeToString(ciphertext), nil
}
```

### `gcm.Seal` 的三个参数

```go
func (g *gcm) Seal(dst, nonce, plaintext, additionalData []byte) []byte
```

- `dst`：输出缓冲区；传 `nonce` 的作用是把 nonce 原封不动写到输出开头，后面紧跟密文
- `nonce`：本次加密用的随机数，GCM 要求不重复；每次 `Encrypt` 都新生成
- `additionalData`：用于完整性校验但不加密的附加数据，本项目没用

输出结构：`[nonce(12B)] + [密文] + [认证标签(16B)]`，全部 Base64 后前面加 `"ENC:"` 前缀。

### 前缀的作用

```go
const encryptedPrefix = "ENC:"
```

加上 `"ENC:"` 前缀后：

- **解密时可以识别**：看到前缀才去 base64 + GCM decrypt
- **兼容明文**：没有前缀的字符串直接当明文返回，不报错

这正是下一节要讲的"平滑迁移"。

## 平滑迁移：兼容历史明文

早期版本 Rocket-Leaf 没有加密，JSON 文件里 `accessKey` 是明文。加密功能上线后，**不能要求用户手动迁移**。解密函数里对此做了兜底：

```go
func Decrypt(ciphertext string, field string) (string, error) {
    if ciphertext == "" {
        return "", nil
    }
    if !strings.HasPrefix(ciphertext, encryptedPrefix) {
        // 兼容未加密的旧数据：当明文返回
        return ciphertext, nil
    }
    if globalKey == nil {
        return "", errors.New("加密密钥未初始化")
    }

    data, err := base64.StdEncoding.DecodeString(ciphertext[len(encryptedPrefix):])
    if err != nil {
        return "", fmt.Errorf("解码密文失败: %w", err)
    }

    key := deriveFieldKey(globalKey, field)
    block, _ := aes.NewCipher(key)
    gcm, _ := cipher.NewGCM(block)

    nonceSize := gcm.NonceSize()
    if len(data) < nonceSize {
        return "", errors.New("密文数据过短")
    }

    nonce, sealed := data[:nonceSize], data[nonceSize:]
    plaintext, err := gcm.Open(nil, nonce, sealed, nil)
    if err != nil {
        return "", fmt.Errorf("解密失败: %w", err)
    }
    return string(plaintext), nil
}
```

### 迁移流程

1. 老用户升级后启动 App
2. `ConnectionService.loadConnectionsFromFile` 读到明文 `accessKey`
3. `Decrypt` 看到没有 `ENC:` 前缀，**直接返回原文**
4. 内存里的 `Connection` 对象此刻是明文
5. 用户任何一次 save（比如调用 `UpdateConnection`）触发 `saveConnectionsLocked`
6. `Encrypt` 生成带 `ENC:` 前缀的密文写回文件
7. 从此之后，这条记录就是加密状态

**整个过程对用户完全透明**，不需要手动操作任何东西。

## 小细节：空字符串不加密

```go
func Encrypt(plaintext string, field string) (string, error) {
    if plaintext == "" {
        return "", nil
    }
    // ...
}
```

- 空字符串加密后还是 base64 密文，会污染没填 ACL 的连接
- JSON 里保留空字符串更符合语义（"没设置"而不是"加密的空字符串"）

解密端也有对应的对称分支：

```go
if ciphertext == "" {
    return "", nil
}
```

## 测试点

如果要给 `crypto` 包写测试，重点覆盖以下场景：

- 加密后再解密能恢复原文
- 同一个 plaintext 两次加密的结果**不同**（因为 nonce 随机）
- 用错误的 `field` 解密会失败（验证字段隔离）
- 密文中间字节被篡改 → GCM 认证失败
- 没有 `ENC:` 前缀的字符串直接作为明文返回
- 空字符串永远加密/解密为空字符串
- `globalKey` 未初始化时加密返回错误

## 总结

- 加密是**工程责任**而不是功能亮点，尤其涉及密钥的本地应用更要做
- AES-256-GCM 是目前最推荐的对称加密模式，Go 标准库直接支持
- 字段级派生密钥可以在复杂度几乎不增加的前提下提升安全边界
- 带前缀的密文 + 兜底读明文，是**平滑迁移**的标准套路
- **永远使用 `crypto/rand`，永远不要复用 nonce**

下一章看前端的目录结构与 Wails 类型绑定的使用方式。
