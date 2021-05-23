## ⚡ [StrangerThing](https://ctf.hcmus.edu.vn/challenges#StrangerThing-35)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-viplazy-brightgreen.svg)](https://img.shields.io/badge/member-viplazy-brightgreen.svg)
[![df](https://img.shields.io/badge/25-pts-brightgreen.svg)](https://img.shields.io/badge/25-pts-brightgreen.svg)

Tác giả: `pakkunandy`

Tags: `misc` `linux cmd`

### Challenge Description

This is not a difficult challenge. Just make sure that you can use linux :)

SSH Server username: ctf
password: hcmus-ctf
ip: 61.28.237.24
port: 30401

### Summary

Muốn vượt qua được challange này đòi hỏi ta phải có kiến thức cơ bản về linux. Tất nhiên là google có thể giải quyết mọi thứ xD.

### Exploit

Đầu tiên, theo gợi ý, ta ssh vào server: 

```bash
$ ssh ctf@61.28.237.24 -p 30401
ctf@61.28.237.24's password:
Welcome to Ubuntu 18.04.5 LTS (GNU/Linux 5.10.12-200.fc33.x86_64 x86_64)
...
Last login: Sun May 23 14:23:41 2021 from ...
$ 
```

Kiểm tra cây thư mục:

```bash
$ ls -al
total 24
-rwxr-----. 1 root ctf    17 May 21 10:20 '-flag 2.txt'
drwxr-x---. 1 root ctf   107 May 21 10:30  .
drwxr-xr-x. 1 root root   17 May 20 15:58  ..
-rwxr-x---. 1 root ctf   220 Apr  4  2018  .bash_logout
-rwxr-x---. 1 root ctf  3771 Apr  4  2018  .bashrc
-rwxr-x---. 1 root ctf   807 Apr  4  2018  .profile
-rwxr-----. 1 root ctf    15 May 21 10:14  flag1.txt
drwxr-x---. 1 root ctf  4096 May 21 10:20  secret
```

Như vậy, ta thấy có 2 part của flag ở đây, và dự đoán vẫn còn có flag ở thư mục secret.

Lấy phần dữ liệu đầu tiên:

```bash
$ cat flag1.txt
HCMUS-CTF{this
```

Lấy phần dữ liệu thứ 2: Để đọc được file có dấu `-` này, ta sẽ dùng trick thêm 2 dấu `--` trước tên file:

```bash
$ cat -- \-flag\ 2.txt
_is_used_to_test
```
Tìm kiếm phần dữ liệu bí mật:

```bash
$ find secret | grep flag
secret/.flag3.txt

$ cat secret/.flag3.txt
_linux_command_line}
```

Vậy là đã đủ 3 phần, lấy cờ thôi.

📫 Flag: **`HCMUS-CTF{this_is_used_to_test_linux_command_line}`**

---
*[Back to table of contents](../README.md)*
