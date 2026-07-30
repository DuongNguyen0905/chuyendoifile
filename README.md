# Office Tools

Bộ công cụ văn phòng miễn phí (PDF, Excel, Word, Ảnh), xử lý 100% trên trình duyệt — không có backend, không upload file lên server.

## Website

Sau khi deploy: `https://<github-username>.github.io/office-tools/`

## Việc cần bạn tự làm để bật quảng cáo (không ai làm thay được)

1. Đăng ký tài khoản Google AdSense tại https://www.google.com/adsense — cần thông tin cá nhân/ngân hàng thật của bạn để nhận thanh toán.
2. Thêm site này vào AdSense, chờ Google duyệt (có thể mất vài ngày, cần đủ nội dung/traffic tối thiểu).
3. Sau khi được duyệt, Google cấp cho bạn:
   - Một đoạn `<script>` với `client=ca-pub-XXXXXXXXXXXXXXXX` → dán vào `<head>` của [index.html](index.html), thay cho dòng TODO đã đánh dấu sẵn.
   - Một dòng cấu hình cho [ads.txt](ads.txt) → bỏ dấu `#` và thay `pub-0000000000000000` bằng ID thật.
   - Mã `<ins class="adsbygoogle">` cho từng vị trí quảng cáo → thay vào 2 khung "Vị trí quảng cáo" đã có sẵn trong `index.html` (đánh dấu bằng chú thích `AD SLOT`).
4. Sau khi sửa xong, commit và push lại — GitHub Pages sẽ tự cập nhật sau khoảng 1-2 phút.

## Cập nhật website sau này

```bash
git add -A
git commit -m "Mô tả thay đổi"
git push
```

GitHub Pages tự động build lại sau mỗi lần push.
