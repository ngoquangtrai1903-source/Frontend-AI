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
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-7">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <span>📋</span>
            Patient Information
          </h3>
        </div>

        {/* Form Grid */}
        <div className="p-8 grid md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="space-y-6">
            <FormField label="Gender" icon="👤">
              <select
                value={formData.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className="form-select"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </FormField>

            <FormField label="Age" icon="🎂">
              <input
                type="number"
                min="0"
                max="100"
                value={formData.age}
                onChange={(e) => updateField("age", parseInt(e.target.value))}
                className="form-input"
              />
              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>0</span>
                <span>100</span>
              </div>
            </FormField>

            <FormField label="Smoking History" icon="🚬">
              <select
                value={formData.smoking}
                onChange={(e) => updateField("smoking", e.target.value)}
                className="form-select"
              >
                <option value="never">Never</option>
                <option value="former">Former</option>
                <option value="current">Current</option>
                <option value="ever">Sometimes</option>
                <option value="not current">Not Current</option>
              </select>
            </FormField>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <FormField label="High Blood Pressure" icon="❤️">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!formData.hypertension}
                    onChange={() => updateField("hypertension", false)}
                    className="form-radio"
                  />
                  <span className="text-slate-300">No</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.hypertension}
                    onChange={() => updateField("hypertension", true)}
                    className="form-radio"
                  />
                  <span className="text-slate-300">Yes</span>
                </label>
              </div>
            </FormField>

            <FormField label="Heart Disease" icon="💔">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!formData.heart_disease}
                    onChange={() => updateField("heart_disease", false)}
                    className="form-radio"
                  />
                  <span className="text-slate-300">No</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.heart_disease}
                    onChange={() => updateField("heart_disease", true)}
                    className="form-radio"
                  />
                  <span className="text-slate-300">Yes</span>
                </label>
              </div>
            </FormField>

            <FormField label="BMI Index" icon="⚖️">
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
                <div className="h-2 bg-gradient-to-r from-emerald-400 via-yellow-400 to-red-500 rounded-full" />
                <div className="mt-1 flex justify-between text-xs text-slate-500">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Obese</span>
                </div>
              </div>
            </FormField>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <FormField label="HbA1c Index (%)" icon="🩸">
              <input
                type="number"
                min="3"
                max="15"
                step="0.1"
                value={formData.hba1c}
                onChange={(e) => updateField("hba1c", parseFloat(e.target.value))}
                className="form-input"
              />
              <div className="mt-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <p className="text-xs text-blue-300">
                  {formData.hba1c < 5.7 ? "✅ Normal" : 
                   formData.hba1c < 6.5 ? "⚠️ Prediabetes" : 
                   "🔴 High Risk"}
                </p>
              </div>
            </FormField>

            <FormField label="Blood Glucose (mg/dL)" icon="🍬">
              <input
                type="number"
                min="50"
                max="400"
                value={formData.glucose}
                onChange={(e) => updateField("glucose", parseInt(e.target.value))}
                className="form-input"
              />
              <div className="mt-2 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                <p className="text-xs text-cyan-300">
                  {formData.glucose < 100 ? "✅ Normal" : 
                   formData.glucose < 126 ? "⚠️ Prediabetes" : 
                   "🔴 Diabetes"}
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
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:from-blue-600 hover:to-cyan-600 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                🚀 ANALYZE RISK
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
      <label className="block mb-3 text-sm font-semibold text-slate-200 flex items-center gap-2">
        <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}
