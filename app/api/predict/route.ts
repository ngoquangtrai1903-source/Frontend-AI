import { NextRequest, NextResponse } from 'next/server';

// Mock data cho demo - Thay thế bằng model ML thực tế
export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Validate input
    const requiredFields = ['gender', 'age', 'smoking', 'hypertension', 'heart_disease', 'bmi', 'hba1c', 'glucose'];
    for (const field of requiredFields) {
      if (formData[field] === undefined) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Calculate mock probability based on risk factors
    let probability = 0.1; // Base probability
    
    // Risk factors
    if (formData.hba1c > 6.5) probability += 0.3;
    else if (formData.hba1c > 5.7) probability += 0.15;
    
    if (formData.glucose > 126) probability += 0.25;
    else if (formData.glucose > 100) probability += 0.1;
    
    if (formData.bmi > 30) probability += 0.2;
    else if (formData.bmi > 25) probability += 0.1;
    
    if (formData.age > 60) probability += 0.15;
    else if (formData.age > 45) probability += 0.08;
    
    if (formData.hypertension) probability += 0.1;
    if (formData.heart_disease) probability += 0.12;
    if (formData.smoking !== 'never') probability += 0.08;

    probability = Math.min(probability, 0.95); // Cap at 95%

    // Calculate SHAP-like impacts
    const impacts = [
      {
        feature: 'HbA1c',
        impact: formData.hba1c > 6.5 ? 15.2 : formData.hba1c > 5.7 ? 8.5 : -2.3
      },
      {
        feature: 'Đường huyết',
        impact: formData.glucose > 126 ? 12.8 : formData.glucose > 100 ? 6.2 : -1.8
      },
      {
        feature: 'BMI',
        impact: formData.bmi > 30 ? 9.5 : formData.bmi > 25 ? 4.3 : -1.2
      },
      {
        feature: 'Tuổi',
        impact: formData.age > 60 ? 7.2 : formData.age > 45 ? 3.8 : -0.9
      },
      {
        feature: 'Hút thuốc',
        impact: formData.smoking === 'current' ? 5.8 : formData.smoking === 'former' ? 2.1 : -0.5
      },
      {
        feature: 'Huyết áp',
        impact: formData.hypertension ? 4.9 : -0.4
      },
      {
        feature: 'Bệnh tim',
        impact: formData.heart_disease ? 4.2 : -0.3
      },
      {
        feature: 'Giới tính',
        impact: formData.gender === 'Male' ? 1.2 : -0.8
      }
    ];

    // Generate AI advice
    const riskLevel = probability > 0.7 ? 'cao' : probability > 0.4 ? 'trung bình' : 'thấp';
    const topRisks = impacts
      .filter(i => i.impact > 3)
      .sort((a, b) => b.impact - a.impact)
      .slice(0, 3)
      .map(i => i.feature);

    const aiAdvice = `
Dựa trên phân tích chi tiết các chỉ số của bạn, nguy cơ mắc bệnh tiểu đường ở mức **${riskLevel}** với xác suất ${(probability * 100).toFixed(1)}%.

**🔍 Phân tích chi tiết:**

${formData.hba1c > 6.5 ? 
  `- **HbA1c ${formData.hba1c}%** cao hơn ngưỡng tiểu đường (6.5%). Đây là yếu tố quan trọng nhất cần kiểm soát ngay.` :
  formData.hba1c > 5.7 ?
  `- **HbA1c ${formData.hba1c}%** ở mức tiền tiểu đường (5.7-6.4%). Cần theo dõi và kiểm soát.` :
  `- **HbA1c ${formData.hba1c}%** ở mức bình thường. Tiếp tục duy trì.`}

${formData.glucose > 126 ?
  `- **Đường huyết ${formData.glucose} mg/dL** vượt ngưỡng tiểu đường. Cần can thiệp y tế.` :
  formData.glucose > 100 ?
  `- **Đường huyết ${formData.glucose} mg/dL** ở mức tiền tiểu đường. Nên điều chỉnh chế độ ăn.` :
  `- **Đường huyết ${formData.glucose} mg/dL** bình thường.`}

${formData.bmi > 30 ?
  `- **BMI ${formData.bmi}** cho thấy béo phì. Đây là yếu tố nguy cơ cao.` :
  formData.bmi > 25 ?
  `- **BMI ${formData.bmi}** ở mức thừa cân. Nên giảm cân để giảm nguy cơ.` :
  `- **BMI ${formData.bmi}** ở mức lý tưởng.`}

**💡 3 Khuyến nghị hành động:**

1. **${topRisks[0] || 'Kiểm soát đường huyết'}**: ${
  topRisks[0] === 'HbA1c' ? 'Theo dõi HbA1c định kỳ 3 tháng/lần. Ăn ít đường, tinh bột trắng.' :
  topRisks[0] === 'Đường huyết' ? 'Đo đường huyết hàng ngày. Tránh thức ăn có chỉ số đường cao.' :
  topRisks[0] === 'BMI' ? 'Giảm 5-10% cân nặng trong 6 tháng. Tập thể dục 150 phút/tuần.' :
  'Duy trì chế độ ăn uống lành mạnh, nhiều rau xanh.'
}

2. **Thay đổi lối sống**: ${
  probability > 0.6 ? 'Cần thay đổi ngay. Tập aerobic 30 phút/ngày, tránh ngồi lâu.' :
  'Tăng cường vận động, đi bộ sau bữa ăn.'
}

3. **Theo dõi y tế**: ${
  probability > 0.7 ? 'Khám chuyên khoa tiểu đường NGAY. Kiểm tra mỗi 3 tháng.' :
  probability > 0.4 ? 'Khám kiểm tra sau 6 tháng. Theo dõi các chỉ số tại nhà.' :
  'Kiểm tra sức khỏe định kỳ hàng năm.'
}

⚠️ **Lưu ý**: Kết quả này chỉ mang tính tham khảo. Vui lòng tham khảo ý kiến bác sĩ chuyên khoa để có chẩn đoán và phương pháp điều trị chính xác.
    `.trim();

    // Return results
    const results = {
      probability,
      conclusion: probability > 0.5 ? 'DƯƠNG TÍNH' : 'ÂM TÍNH',
      riskLevel: probability > 0.7 ? 'high' : probability > 0.4 ? 'medium' : 'low',
      impacts: impacts.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)),
      aiAdvice,
      metadata: {
        model_version: '1.0.0',
        timestamp: new Date().toISOString(),
        processing_time_ms: 1000
      }
    };

    return NextResponse.json(results);

  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    model: 'DiabeTwin v1.0',
    timestamp: new Date().toISOString()
  });
}
