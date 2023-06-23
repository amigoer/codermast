---
order : 22
---

# Redis原理 - 通信协议RESP


## RESP协议

Redis 是一个 CS 架构的软件，通信一般分两步（不包括pipeline 和 PubSub）：

1. 客户端（client）向服务端（server）发送一条命令
2. 服务端解析并执行命令，返回响应结果给客户端

因此客户端发送命令的格式、服务端响应结果的格式必须有一个规范，这个规范就是通信协议。

::: note CS架构
CS架构一般指服务器-客户机。 服务器-客户机，即Client-Server(C/S)结构。C/S结构通常采取两层结构。服务器负责数据的管理，客户机负责完成与用户的交互任务。

[百度百科-CS架构](https://baike.baidu.com/item/%E6%9C%8D%E5%8A%A1%E5%99%A8-%E5%AE%A2%E6%88%B7%E6%9C%BA?fromtitle=CS%E6%9E%B6%E6%9E%84&fromid=7859292&fromModule=lemma_search-box)
:::


而在 Redis 中采用的是 RESP 协议（Redis Sericlization Protocol）协议：

- Redis 1.2 版本引入了 RESP 协议
- Redis 2.0 版本中成为与 Redis 服务端通信的标准，成为 RESP 2
- Resis 6.0 版本中，从 RESP2 升级到了 RESP3 协议，增加了更多数据类型并且支持 6.0 的新特性——客户端缓存

但是目前，默认使用的还是 RESP2 协议，也是我们需要重点掌握的协议。

在 RESP 中，通过首字节的字符来区分不同数据类型，常用的数据类型包括5种：
- 单行字符串：首字节是 ‘+’，后面跟上单行字符串，以CRLF（"\r\n"）结尾，例如返回“OK”："+OK\r\n"
- 错误(Errors)：首字节是 '-'，与单行字符串格式一样，只是字符串是异常信息，例如："-Error message\r\n"
- 数值：首字节是 ':' ，后面跟上数字格式的字符串，以 CRLF 结尾。例如：":10\r\n"
- 多行字符串：首字节是 '$'，表示二进制安全的字符串，最大支持 512 MB
    - 如果大小为0，则代表空字符串："$0\r\n\r\n"
    - 如果大小为-1，则代表不存在："$-1\r\n"

> 这种方式通过记录字符串长度，来达到存储特殊字符的字符串的目的。例如存储 `hello`字符串，底层存储为："$5\r\nhello\r\n"
- 数组：首字节是 '*'，后面跟上数组元素个数，再跟上元素，元素数据类型不限，可以是上述所有类型，还可以是数组。例如： 
```
*4\r\n
$3\r\nset\r\n
$4\r\nname\r\n
$6\r\n小鹏\r\n
*2\r\n$3\r\nage\r\n:10\r\n
```
中文字符，一个占3个字节。

## 自定义客户端

基于 Socket 自定义 Redis 客户端。

```java
class MyRedisClient{
    static Socket s;
    static PrintWriter writer;
    static BufferedReader reader;
    public static void main(String[] args) {
        try {
            // 1.建立连接
            String host = "127.0.0.1";
            int port = 6379;
            s = new Socket(host, port);
            // 2.获取输出流、输入流
            writer = new PrintWriter(new OutputStreamWriter(s.getOutputStream(), StandardCharsets.UTF_8));
            reader = new BufferedReader(new InputStreamReader(s.getInputStream(), StandardCharsets.UTF_8));

            // 3.发出请求
            // 3.1.获取授权 auth codermast
            sendRequest("auth", "codermast");
            Object obj = handleResponse();
            System.out.println("obj = " + obj);

            // 3.2.set name 小鹏
            sendRequest("set", "name", "小鹏");
            // 4.解析响应
            obj = handleResponse();
            System.out.println("obj = " + obj);

            // 3.2.set name 小鹏
            sendRequest("get", "name");
            // 4.解析响应
            obj = handleResponse();
            System.out.println("obj = " + obj);

            // 3.2.set name 小鹏
            sendRequest("mget", "name", "num", "msg");
            // 4.解析响应
            obj = handleResponse();
            System.out.println("obj = " + obj);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 5.释放连接
            try {
                if (reader != null) reader.close();
                if (writer != null) writer.close();
                if (s != null) s.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private static Object handleResponse() throws IOException {
        // 读取首字节
        int prefix = reader.read();
        // 判断数据类型标示
        switch (prefix) {
            case '+': // 单行字符串，直接读一行
                return reader.readLine();
            case '-': // 异常，也读一行
                throw new RuntimeException(reader.readLine());
            case ':': // 数字
                return Long.parseLong(reader.readLine());
            case '$': // 多行字符串
                // 先读长度
                int len = Integer.parseInt(reader.readLine());
                if (len == -1) {
                    return null;
                }
                if (len == 0) {
                    return "";
                }
                // 再读数据,读len个字节。我们假设没有特殊字符，所以读一行（简化）
                return reader.readLine();
            case '*':
                return readBulkString();
            default:
                throw new RuntimeException("错误的数据格式！");
        }
    }

    private static Object readBulkString() throws IOException {
        // 获取数组大小
        int len = Integer.parseInt(reader.readLine());
        if (len <= 0) {
            return null;
        }
        // 定义集合，接收多个元素
        List<Object> list = new ArrayList<>(len);
        // 遍历，依次读取每个元素
        for (int i = 0; i < len; i++) {
            list.add(handleResponse());
        }
        return list;
    }

    // set name 小鹏
    private static void sendRequest(String ... args) {
        writer.println("*" + args.length);
        for (String arg : args) {
            writer.println("$" + arg.getBytes(StandardCharsets.UTF_8).length);
            writer.println(arg);
        }
        writer.flush();
    }
}

```