---
order : 1
---

# Redis实战 - 短信登录

## API
在实现之间我们需要先通过阅读源代码或者查看文档方式，了解这个功能所需要实现的 API 接口。

前端访问的 URL 地址：`/login.html`



具体调用的是`com/hmdp/controller/UserController.java`控制器类中的方法，我们实现即可。

## 基于 Session 实现
基于 Session 的实现我们主要是实现这三个部分：

![](../../../../assets/message-login/2023-05-20-15-54-56.png)


- 发送短信验证码

::: tip 接口信息

|请求方式|`POST`|
|:---:|:---:|
|请求路径|`/user/code`|
|请求参数|`phone`手机号|
|返回值|`null`|
|方法名|`sendCode`|

:::

```java
/**
 * 发送手机验证码
 */
public Result senCode(String phone, HttpSession session) {
    // 1. 校验手机号是否符合
    if (RegexUtils.isPhoneInvalid(phone)){
        // 2. 如果不符合，则返回失败
        return Result.fail("手机号格式错误！");
    }
    // 3. 手机号格式正确
    // 4. 生成验证码
    String code = RandomUtil.randomNumbers(6);

    // 5. 发送验证码
    log.info("手机验证码为：" + code);
    // 6. 返回信息
    return Result.ok("发送成功");
}
```
- 短信验证码注册、登录

::: tip 接口信息

|请求方式|`POST`|
|:---:|:---:|
|请求路径|`/user/login`|
|请求参数|1. `phone` 手机号<br />2. `code` 验证码|
|返回值|`null`|
|方法名|`login`|

:::

```java
/**
 * 登录功能
 * @param loginForm 登录参数，包含手机号、验证码；或者手机号、密码
 */
@PostMapping("/login")
public Result login(@RequestBody LoginFormDTO loginForm, HttpSession session){
    // TODO 实现登录功能
    return Result.fail("功能未完成");
}
```
- 校验登录状态






## 基于 Redis 实现


