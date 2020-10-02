## ⚡ [CarveMe](https://ctf.hcmus.edu.vn/challenges#CarveMe)

[![df](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)](https://img.shields.io/badge/B3T4-shark-brightgreen.svg)
[![df](https://img.shields.io/badge/member-BHD233-brightgreen.svg)](https://img.shields.io/badge/member-BHD233-brightgreen.svg)
[![df](https://img.shields.io/badge/228-pts-brightgreen.svg)](https://img.shields.io/badge/228-pts-brightgreen.svg)


Tác giả: `pakkunandy`



Tags: `reversing` 


### Challenge Description

Đề bài cho một phần mềm APK: https://tinyurl.com/yys4q337

### Summary
Sử dụng https://www.apkdecompilers.com/ để decompile file apk đề cho.

Sau khi mở và phân tích, ta thấy được flag được chia thành 3 phần firt, second và third part.

Hàm get first part khá đơn giản:

```java
    public String getFirstPart() {
        byte[] valueDecoded = new byte[0];
        try {
            valueDecoded = Base64.decode("SENNVVMtQ1RGe1dlX2ZvdW5kX1lPVV8=".getBytes("UTF-8"), 0);
        } catch (UnsupportedEncodingException e) {
        }
        return new String(valueDecoded);
    }
```
Vậy ta đơn giản là decode đoạn base 64 đó và ta được first part: ***`HCMUS-CTF{We_found_YOU_`***

Tiếp tục phân tích thì second part được tao bằng cách gửi request yêu cầu server trả về gói tin với đầu vào là password được nhập:

```java
 public String getSecondPart(String pin) {
        String ans;
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("http://159.65.13.76:54321/carveme/");
            sb.append(pin);
            ans = getUrlContent(sb.toString());
        } catch (FileNotFoundException e) {
            ans = "Too many requests, slow down. You can do at most 10 requests per minute.";
        } catch (Exception e2) {
            StringBuilder sb2 = new StringBuilder();
            String str = "Exception: ";
            sb2.append(str);
            sb2.append(Log.getStackTraceString(e2));
            String ans2 = sb2.toString();
            StringBuilder sb3 = new StringBuilder();
            sb3.append(str);
            sb3.append(Log.getStackTraceString(e2));
            Log.e("HCMUS-CTF", sb3.toString());
            return ans2;
        }
        return ans;
    }
```

Vậy ta cần tìm đúng pin để gửi yêu cầu lên server. Tìm đến hàm check mã pin:

```java
 public static boolean checkPin(String pin) {
        if (pin.length() != 8) {
            return false;
        }
        try {
            byte[] pinBytes = pin.getBytes();
            for (int i = 0; i < 25; i++) {
                for (int j = 0; j < 400; j++) {
                    MessageDigest md = MessageDigest.getInstance("MD5");
                    md.update(pinBytes);
                    pinBytes = (byte[]) md.digest().clone();
                }
            }
            if (toHexString(pinBytes).equals("9d0799dc2db5ecd497f3b4c26afd6265")) {
                return true;
            }
            return false;
        } catch (Exception e) {
            Log.e("HCMUS-CTF", "Exception while checking pin");
            return false;
        }
    }
```

Hàm này hash md5 pin khoảng 1000 lần rồi so sánh với chuối hash xem có đúng không. Ta biết thêm được rằng mã pin có độ dài là 8, toàn là số và có dạng 75****** (dựa vào gợi ý) Vậy ta brute force mã pin:

```java
import java.security.MessageDigest;

    public static void main(String args[]){  
    System.out.println("Hello Java");  
    int i = 0;

    for (i = 75000000; i <75999999; i++) {
        if (i % 100000 == 0) {
            System.out.print("Processing ...");
            System.out.println(i);
        }
            if (checkPin(Integer.toString(i))) {
                System.out.println(i);

                //break; 
            }
    }
 
	public static boolean checkPin(String pin) {
        // if (pin.length() != 8) {
            // return false;
        // }
        try {
            byte[] pinBytes = pin.getBytes();
             for (int i = 0; i < 25; i++) {
                 for (int j = 0; j < 400; j++) {
                    MessageDigest md = MessageDigest.getInstance("MD5");
                    md.update(pinBytes);
                    pinBytes = (byte[]) md.digest().clone();
					//System.out.println(toHexString(pinBytes));
                }
            }
            if (toHexString(pinBytes).equals("9d0799dc2db5ecd497f3b4c26afd6265")) {
                return true;
            }
            return false;
        } catch (Exception e) {
            //Log.e("HCMUS-CTF", "Exception while checking pin");
            return false;
        }
    }

    public static String toHexString(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(b & 255);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
```

Sau khi chạy ta được mã pin là: 75796471. Truy cập đến đường dẫn: http://159.65.13.76:54321/carveme/75796471 ta lấy được second part: 

Tiếp tục tìm kiếm ta thấy được third part toast với welcome string và chuỗi *Secret_@gent}*

Tìm welcome strings trong res->value->strings.xml kết hợp với chuỗi ở trên ta được third part: ***`f@bulous_2Up3R_ Secret_@gent}`***


📫 Flag: **`HCMUS-CTF{}`**

---
*[Back to table of contents](../README.md)*
