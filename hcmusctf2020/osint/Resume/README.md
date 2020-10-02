## ⚡ [Resume](https://ctf.hcmus.edu.vn/challenges#Quelcome)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-August23rd-brightgreen.svg)](https://img.shields.io/badge/member-August23rd-brightgreen.svg)
[![df](https://img.shields.io/badge/150-pts-brightgreen.svg)](https://img.shields.io/badge/150-pts-brightgreen.svg)


Tác giả: `coda` `Glutamo Team`



Tags: `osint` 


### Challenge Description
Đề bài cho một file rar bị khoá và yêu cầu tìm email của một người khách hàng nào đó.

[compressed.rar](./compressed.rar)

### Summary
Trước tiên ta cần mở khoá file rar này. Mở file rar này lên bằng winrar, để ý ở bên phải có một chuỗi kí tự lạ: ```5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8```, nghi là một mã hash, ta bỏ vào tool phân tích thì thấy đó là hash sha1 của chuỗi ```password```. Thử nhập chuỗi đó làm mật khẩu giải nén thì thấy thành công.

Sau khi giải nén thành công, ta được một file pdf. Mở lên ta thấy đó là CV của một người tên Tran Thanh Hung. Tuy nhiên trong CV không hề có email. Đọc CV thì ta thấy được nơi học cũng như vị trí công tác của người đó qua các năm. Thử lên Google tìm thông tin người này với từ khoá là tên và vị trí làm việc hiện tại: ```"Tran Thanh Hung" "Vingroup JSC,"```. May mắn thay ta thấy được một tài khoản linkedin có tên giống vậy với đƯờng dẫn vn.linkedin.com/in/glutamo-team-ctf-funny. 

Truy cập vào thì trình duyệt báo lỗi server, thử bỏ đầu vn. thì cuối cùng ta cũng vô được trang linkedin này và lấy được mail là: glutamo_team_ctf_funny@yahoo.com và đó cũng chính là flag

📫 Flag: **`HCMUS-CTF{glutamo_team_ctf_funny@yahoo.com}`**

---
*[Back to table of contents](../README.md)*
