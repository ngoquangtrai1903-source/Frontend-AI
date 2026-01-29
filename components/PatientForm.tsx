"use client";

import { useState } from "react";

interface PatientFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export function PatientForm({ onSubmit, isLoading }: PatientFormProps) {
  const [formData, setFormData] = useState({
    gender: "Male",
    age: 45,
    smoking: "never",
    hypertension: false,
    heart_disease: false,
    bmi: 24.5,
    hba1c: 5.5,
    glucose: 100
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <span>📋</span>
            Thông tin bệnh nhân
          </h3>
        </div>

        {/* Form Grid */}
        <div className="p-8 grid md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="space-y-6">
            <FormField label="Giới tính" icon="👤">
              <select
                value={formData.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className="form-select"
              >
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>
            </FormField>

            <FormField label="Tuổi" icon="🎂">
              <input
                type="number"
                min="0"
                max="100"
                value={formData.age}
                onChange={(e) => updateField("age", parseInt(e.target.value))}
                className="form-input"
              />
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>100</span>
              </div>
            </FormField>

            <FormField label="Tiền sử hút thuốc" icon="🚬">
              <select
                value={formData.smoking}
                onChange={(e) => updateField("smoking", e.target.value)}
                className="form-select"
              >
                <option value="never">Không bao giờ</option>
                <option value="former">Đã bỏ</option>
                <option value="current">Hiện tại</option>
                <option value="ever">Thỉnh thoảng</option>
                <option value="not current">Không hiện tại</option>
              </select>
            </FormField>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <FormField label="Huyết áp cao" icon="❤️">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!formData.hypertension}
                    onChange={() => updateField("hypertension", false)}
                    className="form-radio"
                  />
                  <span>Không</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.hypertension}
                    onChange={() => updateField("hypertension", true)}
                    className="form-radio"
                  />
                  <span>Có</span>
                </label>
              </div>
            </FormField>

            <FormField label="Bệnh tim" icon="💔">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!formData.heart_disease}
                    onChange={() => updateField("heart_disease", false)}
                    className="form-radio"
                  />
                  <span>Không</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.heart_disease}
                    onChange={() => updateField("heart_disease", true)}
                    className="form-radio"
                  />
                  <span>Có</span>
                </label>
              </div>
            </FormField>

            <FormField label="Chỉ số BMI" icon="⚖️">
              <input
                type="number"
                min="10"
                max="50"
                step="0.1"
                value={formData.bmi}
                onChange={(e) => updateField("bmi", parseFloat(e.target.value))}
                className="form-input"
              />
              <div className="mt-3">
                <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full" />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>Gầy</span>
                  <span>Bình thường</span>
                  <span>Béo phì</span>
                </div>
              </div>
            </FormField>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <FormField label="Chỉ số HbA1c (%)" icon="🩸">
              <input
                type="number"
                min="3"
                max="15"
                step="0.1"
                value={formData.hba1c}
                onChange={(e) => updateField("hba1c", parseFloat(e.target.value))}
                className="form-input"
              />
              <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700">
                  {formData.hba1c < 5.7 ? "✅ Bình thường" : 
                   formData.hba1c < 6.5 ? "⚠️ Tiền tiểu đường" : 
                   "🔴 Nguy cơ cao"}
                </p>
              </div>
            </FormField>

            <FormField label="Đường huyết (mg/dL)" icon="🍬">
              <input
                type="number"
                min="50"
                max="400"
                value={formData.glucose}
                onChange={(e) => updateField("glucose", parseInt(e.target.value))}
                className="form-input"
              />
              <div className="mt-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-xs text-purple-700">
                  {formData.glucose < 100 ? "✅ Bình thường" : 
                   formData.glucose < 126 ? "⚠️ Tiền tiểu đường" : 
                   "🔴 Tiểu đường"}
                </p>
              </div>
            </FormField>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-8 pb-8">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                Đang phân tích...
              </>
            ) : (
              <>
                🚀 PHÂN TÍCH NGUY CƠ
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

function FormField({ 
  label, 
  icon, 
  children 
}: { 
  label: string; 
  icon: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <label className="block mb-3 text-sm font-semibold text-gray-700 flex items-center gap-2">
        <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}
