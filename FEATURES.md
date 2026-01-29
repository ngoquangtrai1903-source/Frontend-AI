# 🎯 Tính năng DiabeTwin UI

## 📊 Tổng quan

DiabeTwin UI là giao diện web hiện đại, được thiết kế đặc biệt cho hệ thống dự đoán tiểu đường sử dụng AI. Giao diện tập trung vào UX/UI y tế chuyên nghiệp với màu sắc nhẹ nhàng, biểu đồ trực quan và thông tin dễ hiểu.

---

## ✨ Danh sách tính năng

### 1. 🎨 Giao diện người dùng

#### 1.1. Header thông minh
- ✅ Logo gradient động với icon 🔬
- ✅ Toggle mode: Người dùng vs Bác sĩ
- ✅ Sticky header với backdrop blur
- ✅ Responsive trên mọi thiết bị

#### 1.2. Màu sắc y tế
- 🟢 **Emerald/Green**: Màu chính - sức khỏe, an toàn
- 🔵 **Cyan/Blue**: Màu phụ - tin cậy, chuyên nghiệp
- 🟡 **Yellow/Amber**: Cảnh báo trung bình
- 🔴 **Red/Rose**: Cảnh báo cao
- ⚪ **White/Gray**: Nền, văn bản

#### 1.3. Typography
- **Display Font**: Playfair Display - sang trọng, chuyên nghiệp
- **Body Font**: Inter - dễ đọc, hiện đại
- **Font weights**: 400 (regular), 600 (semibold), 700 (bold), 900 (black)

---

### 2. 📝 Form nhập liệu bệnh nhân

#### 2.1. Cấu trúc form
- **3 cột responsive**: Auto-collapse trên mobile
- **8 trường thông tin**: 
  1. Giới tính (Gender)
  2. Tuổi (Age)
  3. Tiền sử hút thuốc (Smoking History)
  4. Huyết áp cao (Hypertension)
  5. Bệnh tim (Heart Disease)
  6. Chỉ số BMI
  7. Chỉ số HbA1c (%)
  8. Đường huyết (mg/dL)

#### 2.2. Input types
- **Select dropdown**: Giới tính, Hút thuốc
- **Radio buttons**: Huyết áp, Bệnh tim
- **Number input**: Tuổi, BMI, HbA1c, Glucose
- **Range sliders**: Visual feedback cho BMI

#### 2.3. Validation & Feedback
- ✅ Real-time validation
- ✅ Min/max constraints
- ✅ Visual indicators:
  - 🟢 Bình thường
  - 🟡 Cảnh báo
  - 🔴 Nguy hiểm
- ✅ Tooltip hints

#### 2.4. UX Enhancements
- 🎯 Auto-focus first field
- ⌨️ Keyboard navigation support
- 🖱️ Hover effects
- 📱 Touch-optimized
- ♿ Accessibility compliant

---

### 3. 🎯 Hiển thị kết quả

#### 3.1. Metrics Cards (3 cards)

**Card 1: Xác suất mắc bệnh**
- Large percentage display
- Gradient background
- Animation on load

**Card 2: Kết luận**
- "DƯƠNG TÍNH" (màu đỏ)
- "ÂM TÍNH" (màu xanh)
- Bold typography

**Card 3: Mức độ rủi ro**
- 🔴 Cao (>70%)
- 🟡 Trung bình (40-70%)
- 🟢 Thấp (<40%)

#### 3.2. Layout 2 cột
```
┌─────────────────────────────────┬────────────────┐
│  Impact Analysis (2 cols)       │  AI Advice     │
│  - Impact List                  │  (1 col)       │
│  - Impact Chart                 │                │
│  - Waterfall Chart              │                │
└─────────────────────────────────┴────────────────┘
```

---

### 4. 📊 Biểu đồ phân tích

#### 4.1. Impact List
**Mục đích**: Hiển thị danh sách các yếu tố ảnh hưởng

**Features**:
- ✅ Sắp xếp theo độ tác động (impact)
- ✅ Màu sắc phân biệt:
  - 🔴 Đỏ: Tăng nguy cơ (positive impact)
  - 🟢 Xanh: Giảm nguy cơ (negative impact)
- ✅ Progress bar cho mỗi item
- ✅ Staggered animation (hiệu ứng lần lượt)
- ✅ Emoji indicators

**Example**:
```
🔴 HbA1c        +12.5%  ████████████░░░░
🔴 Đường huyết  +8.3%   ████████░░░░░░░░
🟢 BMI          -3.2%   ░░░░███░░░░░░░░░
```

#### 4.2. Impact Chart (Horizontal Bar Chart)
**Mục đích**: Visualize tác động của từng yếu tố

**Features**:
- ✅ Horizontal bars
- ✅ Center baseline (0%)
- ✅ Bidirectional bars:
  - Đỏ: Phải (positive)
  - Xanh: Trái (negative)
- ✅ Gradient colors
- ✅ Smooth animations
- ✅ Hover effects
- ✅ Value labels

**Technical**:
```typescript
- Max width: 50% of container
- Animation: 1000ms ease-out
- Delay: index * 50ms (staggered)
```

#### 4.3. Waterfall Chart
**Mục đích**: Hiển thị tác động tích lũy (cumulative SHAP)

**Features**:
- ✅ Vertical bars
- ✅ Zero baseline
- ✅ Cumulative effect
- ✅ Connector lines between bars
- ✅ Rotated labels (-45deg)
- ✅ Color coding:
  - Đỏ: Positive impact
  - Xanh: Negative impact
- ✅ Y-axis labels
- ✅ Tooltip explanation

**Layout**:
```
  Value
    │
 15%│     ██
    │     ██
 10%│ ██  ██
    │ ██  ██  ▓▓
  5%│ ██  ██  ▓▓
────┼─────────────────── 0%
    │         ▓▓
 -5%│         ▓▓
    │
    └─HbA1c─Glucose─BMI─→
```

---

### 5. 🤖 AI Advisor

#### 5.1. Content structure
```markdown
**Phân tích chi tiết:**
- HbA1c analysis
- Glucose analysis  
- BMI analysis

**3 Khuyến nghị hành động:**
1. [Top risk factor control]
2. [Lifestyle changes]
3. [Medical follow-up]

⚠️ Disclaimer
```

#### 5.2. AI Generation
- Model: Mock (có thể tích hợp Gemini/GPT)
- Input: Patient data + SHAP impacts
- Output: Personalized advice
- Tone: Professional, empathetic, actionable

---

### 6. 🎬 Animations & Transitions

#### 6.1. Page Load
```
1. Header: Slide down (200ms)
2. Title: Fade in (400ms)
3. Form: Fade in + slide up (600ms)
```

#### 6.2. Form Submit
```
1. Button: Loading spinner
2. Form: Fade out (300ms)
3. Results: Fade in + slide up (500ms)
```

#### 6.3. Results Display
```
1. Metrics cards: Staggered fade in
   - Card 1: 0ms delay
   - Card 2: 100ms delay
   - Card 3: 200ms delay
2. Impact list: Sequential items (50ms/item)
3. Charts: Draw animation (1000ms)
```

#### 6.4. Micro-interactions
- ✨ Button hover: Scale 1.02
- ✨ Card hover: Lift (-4px translate)
- ✨ Input focus: Ring glow
- ✨ Chart bars: Hover expand

---

### 7. 📱 Responsive Design

#### 7.1. Breakpoints
```css
Mobile:  < 768px  (1 column)
Tablet:  768-1024px (2 columns)
Desktop: > 1024px (3 columns)
```

#### 7.2. Mobile optimizations
- Stack form columns vertically
- Full-width buttons
- Touch-friendly inputs (min 44px)
- Simplified charts
- Sticky header

#### 7.3. Tablet optimizations
- 2-column form
- Side-by-side metrics
- Adjusted chart sizes

---

### 8. ♿ Accessibility (A11y)

#### 8.1. WCAG 2.1 Level AA
- ✅ Color contrast ratio ≥ 4.5:1
- ✅ Focus indicators
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA labels
- ✅ Semantic HTML

#### 8.2. Specific implementations
```html
<label for="age">Tuổi</label>
<input id="age" aria-label="Nhập tuổi" />

<button aria-label="Phân tích nguy cơ tiểu đường">
  🚀 PHÂN TÍCH
</button>
```

---

### 9. 🚀 Performance

#### 9.1. Metrics targets
- **FCP**: < 1.5s (First Contentful Paint)
- **LCP**: < 2.5s (Largest Contentful Paint)
- **TTI**: < 3.5s (Time to Interactive)
- **CLS**: < 0.1 (Cumulative Layout Shift)

#### 9.2. Optimizations
- ✅ CSS-only animations (no JS)
- ✅ Lazy load charts
- ✅ Debounced inputs
- ✅ Memoized components
- ✅ Code splitting
- ✅ Image optimization
- ✅ Font preloading

---

### 10. 🔒 Security & Privacy

#### 10.1. Data handling
- ⚠️ No localStorage (session only)
- ⚠️ No cookies
- ⚠️ HTTPS required in production
- ⚠️ Input sanitization
- ⚠️ CORS configuration

#### 10.2. Medical compliance
- ℹ️ Clear disclaimers
- ℹ️ Not a medical device
- ℹ️ Recommend professional consultation
- ℹ️ Privacy policy link (to be added)

---

### 11. 🧪 Testing (To be implemented)

#### 11.1. Unit tests
- Form validation logic
- Data transformation
- Chart calculations

#### 11.2. Integration tests
- Form submission flow
- API integration
- Results display

#### 11.3. E2E tests
- Complete user journey
- Mobile/tablet flows
- Error scenarios

---

### 12. 🔮 Future enhancements

#### Phase 2:
- [ ] User authentication
- [ ] Save analysis history
- [ ] Export to PDF
- [ ] Print-friendly view
- [ ] Compare multiple analyses

#### Phase 3:
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Advanced charts (D3.js)
- [ ] Real-time collaboration
- [ ] Voice input

#### Phase 4:
- [ ] Mobile app (React Native)
- [ ] Wearable integration
- [ ] Continuous monitoring
- [ ] AI chatbot assistant

---

## 📐 Technical specifications

### Component Architecture
```
App (page.tsx)
├── Header
├── PatientForm
│   └── FormField × 8
└── ResultsDisplay
    ├── MetricCard × 3
    ├── ImpactList
    │   └── ImpactItem × n
    ├── ImpactChart
    └── WaterfallChart
```

### State Management
```typescript
- mode: "user" | "doctor"
- results: ResultsType | null
- isAnalyzing: boolean
- formData: PatientData
```

### API Contract
```typescript
POST /api/predict
Request: {
  gender, age, smoking, hypertension,
  heart_disease, bmi, hba1c, glucose
}
Response: {
  probability, conclusion, riskLevel,
  impacts[], aiAdvice, metadata
}
```

---

## 📊 Metrics & Analytics (To be added)

### User behavior tracking
- Form completion rate
- Average time to submit
- Most common input ranges
- Result viewing patterns

### Performance monitoring
- Page load times
- API response times
- Error rates
- Browser/device distribution

---

**Document version**: 1.0.0  
**Last updated**: January 29, 2026  
**Maintained by**: Development Team
