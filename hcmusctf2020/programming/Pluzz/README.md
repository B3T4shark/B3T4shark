## ⚡ [Pluzz](https://ctf.hcmus.edu.vn/challenges#Quelcome)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-August23rd-brightgreen.svg)](https://img.shields.io/badge/member-August23rd-brightgreen.svg)
[![df](https://img.shields.io/badge/50-pts-brightgreen.svg)](https://img.shields.io/badge/50-pts-brightgreen.svg)


Tác giả: `pakkunandy`



Tags: `programming` 


### Challenge Description
Đề bài cho hai file chứa hai số a và b với gợi ý: add eax,ebx

[a](./a)

[b](./../b)
### Summary
Dựa vào gợi ý ta biết cần cộng 2 số a và b lại. Vậy ta biến đổi a, b thành số hex:

a: `0x5d2c552b5f5e4d3c3b2a33445540304c2d5748190e0e3a5a2c51321b11251f132c`

b: `0x20390f44040121052835421b1f003828320e08175a510f211a03111242302e301c`

Cộn a và b ta được chuỗi hex: `
4843 4d55 532d 4354 467b 495f 6830 5065 5f74 6840 745f 755f 6341 6e5f 636f 6465 7d`

Ta mang chuỗi hex này dịch lại thành string, và thế là ta đã được flag.

📫 Flag: **`HCMUS-CTF{I_h0Pe_th@t_u_cAn_code}`**

---
*[Back to table of contents](../README.md)*
