## ⚡ [Puzzle](https://ctf.hcmus.edu.vn/challenges#Puzzle)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-BHD233-brightgreen.svg)](https://img.shields.io/badge/member-BHD233-brightgreen.svg)
[![df](https://img.shields.io/badge/50-pts-brightgreen.svg)](https://img.shields.io/badge/50-pts-brightgreen.svg)


Tác giả: `may`



Tags: `forensics` 


### Challenge Description

Đề bài cho một file zip với các hình ảnh và một file readme

[puzzle.zip](./puzzle.zip)

### Summary
Mở file README lên đọc thì thấy một đường link với gợi ý: 

Seek the origin: https://www.hcmus.edu.vn/images/2020/04/07/bn2.jpg

Left to Right, Bottom to Top.
Throw all digits, the flag will appear.

Truy cập vào đường dẫn ta thấy 1 tấm hình lớn. Vậy đơn giản ta cần ghép các bức hình nhỏ thành sao cho khớp với hình lớn, bỏ các con số và đọc từ trái qua phải, từ trên xuống dưới là lấy được flag.

📫 Flag: **`HCMUS-CTF{GOOD-LUCK-HAV-FUN}`**

---
*[Back to table of contents](../README.md)*
