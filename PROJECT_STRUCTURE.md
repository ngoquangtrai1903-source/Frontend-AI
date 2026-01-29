# 📂 Cấu trúc dự án DiabeTwin UI

## 🌳 File Tree

```
diabetwin-ui/
│
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # API Routes
│   │   └── 📁 predict/
│   │       └── route.ts             # Endpoint dự đoán ML
│   ├── globals.css                  # CSS toàn cục + Tailwind
│   ├── layout.tsx                   # Root layout với metadata
│   └── page.tsx                     # Trang chủ (main page)
│
├── 📁 components/                   # React Components
│   ├── ImpactChart.tsx              # Biểu đồ thanh ngang
│   ├── PatientForm.tsx              # Form nhập liệu
│   ├── ResultsDisplay.tsx           # Hiển thị kết quả
│   └── WaterfallChart.tsx           # Biểu đồ thác nước
│
├── 📁 public/                       # Static assets (tạo khi cần)
│   ├── logo.png
│   └── favicon.ico
│
├── .gitignore                       # Git ignore rules
├── eslint.config.mjs                # ESLint configuration
├── next-env.d.ts                    # Next.js TypeScript definitions
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies & scripts
├── package-lock.json                # Lock file
├── postcss.config.mjs               # PostCSS configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
│
├── 📄 README_DIABETWIN.md           # Tài liệu chính
├── 📄 FEATURES.md                   # Chi tiết tính năng
└── 📄 INSTALLATION.md               # Hướng dẫn cài đặt
```

---

## 📝 Mô tả chi tiết từng file

### 🎯 Core Application Files

#### `app/page.tsx` (Main Entry Point)
**Purpose**: Trang chủ chính của ứng dụng
**Contains**:
- State management (mode, results, isAnalyzing)
- Main layout structure
- Header với mode toggle
- Conditional rendering (Form vs Results)
- Footer

**Key functions**:
```typescript
handleAnalyze(formData) // Xử lý submit form
setMode("user" | "doctor") // Toggle mode
```

**Lines of code**: ~150

---

#### `app/layout.tsx` (Root Layout)
**Purpose**: Layout wrapper cho toàn bộ app
**Contains**:
- HTML structure
- Metadata (title, description, keywords)
- Font loading (Inter, Playfair Display)
- Body wrapper

**Key features**:
- SEO optimization
- Font preloading
- Vietnamese language setting

**Lines of code**: ~30

---

#### `app/globals.css` (Global Styles)
**Purpose**: Styles toàn cục và utilities
**Contains**:
- Tailwind imports
- Custom form styles (.form-input, .form-select)
- Animations (@keyframes)
- Scrollbar customization
- Utility classes

**Custom classes**:
```css
.form-input          // Input styling
.form-select         // Select dropdown
.form-radio          // Radio button
.animate-shimmer     // Shimmer effect
.gradient-text       // Gradient text
.glass               // Glass morphism
```

**Lines of code**: ~130

---

### 🧩 Component Files

#### `components/PatientForm.tsx`
**Purpose**: Form nhập thông tin bệnh nhân
**Contains**:
- 8 input fields
- Form validation
- Real-time feedback
- Submit handler

**Props**:
```typescript
{
  onSubmit: (data: any) => void;
  isLoading: boolean;
}
```

**State**:
```typescript
formData: {
  gender, age, smoking, hypertension,
  heart_disease, bmi, hba1c, glucose
}
```

**Features**:
- 3-column responsive grid
- Icon indicators
- Visual feedback (colors)
- Loading state

**Lines of code**: ~220

---

#### `components/ResultsDisplay.tsx`
**Purpose**: Hiển thị kết quả phân tích
**Contains**:
- 3 metric cards
- Impact list
- Chart containers
- AI advice panel
- Reset button

**Props**:
```typescript
{
  results: ResultsType;
  onReset: () => void;
}
```

**Subcomponents**:
- `MetricCard`: Hiển thị metrics (probability, conclusion, risk)
- `ImpactItem`: Từng item trong danh sách impact

**Features**:
- Staggered animations
- 2-column layout (desktop)
- Sticky AI advice
- Color-coded risk levels

**Lines of code**: ~180

---

#### `components/ImpactChart.tsx`
**Purpose**: Biểu đồ thanh ngang (Impact Bar Chart)
**Contains**:
- Horizontal bars
- Center baseline
- Bidirectional visualization
- Value labels

**Props**:
```typescript
{
  impacts: Array<{ feature: string; impact: number }>;
}
```

**Algorithm**:
1. Sort by absolute impact
2. Calculate max absolute value
3. Render bars from center
4. Animate width (0 → 100%)

**Features**:
- Red bars (positive impact)
- Green bars (negative impact)
- Smooth animations (1000ms)
- Hover effects

**Lines of code**: ~100

---

#### `components/WaterfallChart.tsx`
**Purpose**: Biểu đồ thác nước (Waterfall Chart)
**Contains**:
- Vertical bars
- Cumulative calculation
- Connector lines
- Y-axis labels

**Props**:
```typescript
{
  impacts: Array<{ feature: string; impact: number }>;
}
```

**Algorithm**:
1. Calculate cumulative values
2. Determine bar positions
3. Draw bars with gradients
4. Add connectors
5. Animate height

**Features**:
- Zero baseline reference
- Rotated labels (-45deg)
- Tooltip explanation
- Color-coded bars

**Lines of code**: ~150

---

### 🔧 Configuration Files

#### `next.config.ts`
**Purpose**: Next.js configuration
**Default content**: Empty config object
**Can add**:
- Image domains
- Redirects
- Headers
- Environment variables

---

#### `tsconfig.json`
**Purpose**: TypeScript configuration
**Key settings**:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "jsx": "react-jsx",
    "strict": true,
    "paths": { "@/*": ["./*"] }
  }
}
```

---

#### `tailwind.config.ts`
**Purpose**: Tailwind CSS configuration
**Custom settings**:
- Color palette (primary, secondary)
- Font families
- Animations
- Keyframes

**Custom colors**:
```typescript
primary: {
  500: '#10b981', // emerald
  ...
}
secondary: {
  500: '#06b6d4', // cyan
  ...
}
```

---

#### `package.json`
**Purpose**: NPM dependencies và scripts
**Dependencies**:
```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "react-dom": "19.2.3"
}
```

**DevDependencies**:
```json
{
  "@tailwindcss/postcss": "^4",
  "typescript": "^5",
  "tailwindcss": "^4"
}
```

**Scripts**:
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

---

### 🌐 API Routes

#### `app/api/predict/route.ts`
**Purpose**: API endpoint cho ML prediction
**Methods**:
- `POST /api/predict`: Prediction request
- `GET /api/predict`: Health check

**Input schema**:
```typescript
{
  gender: string,
  age: number,
  smoking: string,
  hypertension: boolean,
  heart_disease: boolean,
  bmi: number,
  hba1c: number,
  glucose: number
}
```

**Output schema**:
```typescript
{
  probability: number,
  conclusion: string,
  riskLevel: "low" | "medium" | "high",
  impacts: Array<{ feature: string; impact: number }>,
  aiAdvice: string,
  metadata: {
    model_version: string,
    timestamp: string,
    processing_time_ms: number
  }
}
```

**Features**:
- Input validation
- Error handling
- Mock data generation
- SHAP-like calculations

**Lines of code**: ~180

---

### 📚 Documentation Files

#### `README_DIABETWIN.md`
**Sections**:
1. Tổng quan
2. Tính năng
3. Cài đặt
4. Cấu trúc dự án
5. Tích hợp backend
6. Tech stack
7. Responsive design
8. License

**Target audience**: Developers, project managers

---

#### `INSTALLATION.md`
**Sections**:
1. Yêu cầu hệ thống
2. Chuẩn bị dự án
3. Cài đặt dependencies
4. Chạy ứng dụng
5. Build production
6. Tích hợp backend
7. Tùy chỉnh giao diện
8. Xử lý lỗi
9. Test mobile
10. Deploy

**Target audience**: Developers (beginner to intermediate)

---

#### `FEATURES.md`
**Sections**:
1. Tổng quan
2. Giao diện người dùng
3. Form nhập liệu
4. Hiển thị kết quả
5. Biểu đồ phân tích
6. AI Advisor
7. Animations
8. Responsive design
9. Accessibility
10. Performance
11. Security
12. Future enhancements

**Target audience**: Product managers, designers, developers

---

## 📊 File Statistics

### By type:
| Type       | Count | Total Lines |
|------------|-------|-------------|
| TypeScript | 7     | ~1,100      |
| CSS        | 1     | ~130        |
| Config     | 5     | ~300        |
| Docs       | 3     | ~1,500      |
| **TOTAL**  | **16**| **~3,030**  |

### By category:
```
Components:    4 files  (~650 lines)
Pages:         2 files  (~180 lines)
API:           1 file   (~180 lines)
Styles:        1 file   (~130 lines)
Config:        5 files  (~300 lines)
Documentation: 3 files  (~1,500 lines)
```

---

## 🔄 Data Flow

```
User Input (PatientForm)
    ↓
Form Validation
    ↓
Submit Handler (page.tsx)
    ↓
API Call (/api/predict)
    ↓
Backend Processing (ML Model)
    ↓
Response (Results)
    ↓
State Update
    ↓
ResultsDisplay Component
    ↓
Charts Rendering
    ├── ImpactChart
    └── WaterfallChart
```

---

## 🏗️ Component Hierarchy

```
App (page.tsx)
│
├── Header
│   ├── Logo
│   └── ModeToggle
│
├── Main Content
│   ├── PatientForm
│   │   ├── FormField (Gender)
│   │   ├── FormField (Age)
│   │   ├── FormField (Smoking)
│   │   ├── FormField (Hypertension)
│   │   ├── FormField (Heart Disease)
│   │   ├── FormField (BMI)
│   │   ├── FormField (HbA1c)
│   │   ├── FormField (Glucose)
│   │   └── SubmitButton
│   │
│   └── ResultsDisplay
│       ├── MetricCard (Probability)
│       ├── MetricCard (Conclusion)
│       ├── MetricCard (Risk Level)
│       ├── ImpactList
│       │   └── ImpactItem × n
│       ├── ImpactChart
│       ├── WaterfallChart
│       ├── AIAdvice
│       └── ResetButton
│
└── Footer
```

---

## 🎨 Styling Architecture

### Tailwind Utilities
- Layout: flex, grid, columns
- Spacing: px, py, gap, space
- Colors: bg, text, border
- Effects: shadow, backdrop-blur
- Transitions: transition-all, duration

### Custom Classes (globals.css)
```css
.form-input       → Input styling
.form-select      → Dropdown styling
.form-radio       → Radio button
.animate-fadeIn   → Fade animation
.gradient-text    → Text gradient
.glass           → Glass effect
```

### Inline Styles (Dynamic)
```typescript
style={{ 
  width: `${percentage}%`,
  transitionDelay: `${delay}ms`
}}
```

---

## 🚀 Build Output

### Development build:
```
.next/
├── cache/
├── server/
│   ├── app/
│   └── chunks/
└── static/
    ├── chunks/
    └── css/
```

### Production build:
```
.next/
├── cache/
├── server/
│   ├── app/
│   │   ├── page.html
│   │   └── api/
│   └── chunks/
└── static/
    ├── chunks/
    │   ├── app-*.js (optimized)
    │   └── pages-*.js
    └── css/
        └── app-*.css (minified)
```

---

## 📦 Bundle Size (Estimated)

```
Total Bundle Size: ~300-400 KB

Breakdown:
- Next.js runtime:     ~85 KB
- React + React DOM:   ~130 KB
- Application code:    ~50 KB
- Tailwind CSS:        ~50 KB
- Fonts (external):    Not included
```

---

## 🔐 Environment Variables (Optional)

Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ML_MODEL_VERSION=1.0.0
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🧪 Testing Structure (To be added)

```
tests/
├── unit/
│   ├── components/
│   │   ├── PatientForm.test.tsx
│   │   ├── ImpactChart.test.tsx
│   │   └── WaterfallChart.test.tsx
│   └── utils/
│       └── calculations.test.ts
├── integration/
│   ├── form-submission.test.tsx
│   └── api-integration.test.ts
└── e2e/
    ├── user-journey.spec.ts
    └── responsive.spec.ts
```

---

## 📈 Performance Budgets

```
Asset Type          Budget      Current
───────────────────────────────────────
JavaScript          < 150 KB    ~50 KB ✅
CSS                 < 50 KB     ~20 KB ✅
Fonts               < 100 KB    External
Images              < 200 KB    N/A
Total First Load    < 400 KB    ~200 KB ✅
```

---

## 🔄 Git Workflow (Recommended)

```
main/master         → Production
├── develop         → Development
    ├── feature/*   → New features
    ├── bugfix/*    → Bug fixes
    └── hotfix/*    → Urgent fixes
```

---

**Document version**: 1.0.0  
**Last updated**: January 29, 2026  
**Total project files**: 16  
**Total lines of code**: ~3,030
