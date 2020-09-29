#!/usr/bin/env python3

from hashlib import sha256
from binascii import hexlify
from pwn import *

# hash bytearray of text to SHA256Digest (return bytearray too)
def SHA256Digest(text):
    digest = sha256(text).digest()

    # we dont have to return a hex printalbe version of this hash
    #return hexlify(digest)
    
    return digest
    
p = remote("159.65.13.76", 64101) 
print(p.recvuntil("nonce: ")) 

# receive nonce from server's response
nonce = p.recv(5)

print("[+] My nonce detected: ", int(nonce)) 
print(p.recvuntil("continue!")) 

# create payload pattern 
payload = "hcmusctf-" + nonce.decode() + "-"

# scan for all number which have length of 5
for i in range(10000, 100000):
    payload1 = payload + str(i)
    bts = SHA256Digest(bytearray(payload1, 'utf-8'))
    
    # check correct answer before send to server
    if (bts[0] == 0 and bts[1] == 0):
        print("correct num: ", i)

        # Correct, capture the flag!
        p.sendline(payload1)
        p.interactive()

