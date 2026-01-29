# 🔬 DiabeTwin - Hệ thống Dự đoán Tiểu đường AI

Giao diện web hiện đại cho hệ thống dự đoán nguy cơ tiểu đường sử dụng AI và Machine Learning.

## ✨ Tính năng

- 🎯 **Form nhập liệu trực quan**: Giao diện đẹp mắt với 8 chỉ số y học quan trọng
- 📊 **Biểu đồ phân tích**: 
  - Biểu đồ thanh ngang (Impact Chart) hiển thị tác động của từng yếu tố
  - Biểu đồ thác nước (Waterfall Chart) cho phân tích SHAP tích lũy
- 🤖 **AI Advisor**: Lời khuyên y tế từ AI dựa trên kết quả phân tích
- 🎨 **Thiết kế hiện đại**: 
  - Gradient màu y tế (xanh lá/xanh dương)
  - Animations mượt mà
  - Responsive design
  - Glass morphism effects

## 🚀 Cài đặt và Chạy

### Yêu cầu
- Node.js 18+ 
- npm hoặc yarn

### Các bước

1. **Cài đặt dependencies**
```bash
npm install
```

2. **Chạy development server**
```bash
npm run dev
```

3. **Mở trình duyệt**
Truy cập [http://localhost:3000](http://localhost:3000)

## 📋 Các chỉ số y học

Form thu thập 8 chỉ số quan trọng:

1. **Giới tính** (Gender)
2. **Tuổi** (Age): 0-100
3. **Tiền sử hút thuốc** (Smoking History): 
   - Không bao giờ
   - Đã bỏ
   - Hiện tại
   - Thỉnh thoảng
4. **Huyết áp cao** (Hypertension): Có/Không
5. **Bệnh tim** (Heart Disease): Có/Không
6. **Chỉ số BMI** (Body Mass Index): 10.0-50.0
7. **Chỉ số HbA1c** (%): 3.0-15.0
   - < 5.7%: Bình thường
   - 5.7-6.4%: Tiền tiểu đường
   - ≥ 6.5%: Tiểu đường
8. **Đường huyết** (Glucose) (mg/dL): 50-400
   - < 100: Bình thường
   - 100-125: Tiền tiểu đường
   - ≥ 126: Tiểu đường

## 🎨 Cấu trúc dự án

```
app/
├── layout.tsx          # Layout chính với metadata
├── page.tsx            # Trang chủ với logic chính
└── globals.css         # Styles toàn cục

components/
├── PatientForm.tsx     # Form nhập thông tin bệnh nhân
├── ResultsDisplay.tsx  # Hiển thị kết quả phân tích
├── ImpactChart.tsx     # Biểu đồ thanh ngang
└── WaterfallChart.tsx  # Biểu đồ thác nước SHAP
```

## 🔌 Tích hợp Backend

Để kết nối với backend ML model:

1. **Tạo API endpoint** (ví dụ: `/api/predict`)

2. **Cập nhật trong `app/page.tsx`**:
```typescript
const handleAnalyze = async (formData: any) => {
  setIsAnalyzing(true);
  
  try {
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const results = await response.json();
    setResults(results);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsAnalyzing(false);
  }
};
```

3. **Format dữ liệu trả về**:
```typescript
{
  probability: number;        // 0-1
  conclusion: string;         // "DƯƠNG TÍNH" | "ÂM TÍNH"
  riskLevel: string;         // "low" | "medium" | "high"
  impacts: Array<{
    feature: string;         // Tên chỉ số
    impact: number;          // % tác động
  }>;
  aiAdvice: string;          // Lời khuyên từ AI
}
```

## 🎯 Features nâng cao có thể thêm

- [ ] Export kết quả PDF
- [ ] Lưu lịch sử phân tích
- [ ] So sánh nhiều kết quả
- [ ] Đa ngôn ngữ (EN/VI)
- [ ] Dark mode
- [ ] Print-friendly view
- [ ] Share results
- [ ] Mobile app (React Native)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI**: Custom components với animations
- **Charts**: Custom SVG/Canvas charts
- **Fonts**: Inter (body) + Playfair Display (display)

## 📱 Responsive Design

Giao diện tối ưu cho mọi thiết bị:
- 📱 Mobile: < 768px
- 💻 Tablet: 768px - 1024px  
- 🖥️ Desktop: > 1024px

## ⚠️ Lưu ý

- Kết quả chỉ mang tính tham khảo
- Không thay thế ý kiến bác sĩ chuyên khoa
- Cần validation dữ liệu đầu vào nghiêm ngặt
- Implement rate limiting cho API
- Thêm authentication nếu cần

## 📄 License

MIT License - Tự do sử dụng cho mục đích học tập và thương mại.

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo Pull Request hoặc Issue.

---

**Phát triển bởi Claude AI** 🤖
