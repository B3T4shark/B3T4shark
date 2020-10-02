## ⚡ [NoobEncoding](https://ctf.hcmus.edu.vn/challenges#Quelcome)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-August23rd-brightgreen.svg)](https://img.shields.io/badge/member-August23rd-brightgreen.svg)
[![df](https://img.shields.io/badge/50-pts-brightgreen.svg)](https://img.shields.io/badge/50-pts-brightgreen.svg)


Tác giả: `pakkunandy`


Tags: `cryptography` 


### Challenge Description
Đề bài cho một file coded với gợi ý: "Bạn biết bao nhiêu thứ tiếng?"

[coded](./coded)

### Summary
Mở file lên thì ta thấy 2 dòng chữ, dịch dòng đầu tiên bằng google dịch ta được: 

![img1](./img/Screenshot%202020-10-01%20204755.jpg)

Vậy việc cần làm là decoded đoạn dưới theo kiểu ASCII 85 và ta được:

![img2](./img/ascii85_to_text.jpg)

Lại phải google dịch đoạn đầu tiên và ta biết lần này là encode dạng base64.

Vậy ta tiến hành decode:

![img3](./img/base64_to_text.jpg)

@@ Thêm một thứ tiếng nữa. Sau khi google dịch thì ta có được gợi ý là gấp đôi 16. Vậy ta lại mang chuỗi đi decode ở dạng base32:

![img4](./img/base32_to_text.jpg)

Finally!! Cuối cùng thi ta cũng đã tìm được flag.

📫 Flag: **`HCMUS-CTF{Just_dEcodE_me_multiple_tim3s}`**

---
*[Back to table of contents](../README.md)*
