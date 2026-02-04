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
    height: 1.70, // height in meters
    weight: 70, // weight in kg
    hba1c: 5.5,
    glucose: 100
  });

  // Calculate BMI from height and weight
  const calculateBMI = (height: number, weight: number): number => {
    if (height <= 0 || weight <= 0) return 0;
    return Number((weight / (height * height)).toFixed(1));
  };

  const currentBMI = calculateBMI(formData.height, formData.weight);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculate BMI before submitting
    const calculatedBMI = calculateBMI(formData.height, formData.weight);
    onSubmit({
      ...formData,
      bmi: calculatedBMI
    });
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* Form Header */}
        <div className="bg-blue-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-7">
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl">📋</span>
            <span className="hidden sm:inline">Patient Information</span>
            <span className="sm:hidden">Patient Info</span>
          </h3>
        </div>

        {/* Form Grid - Responsive */}
        <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Column 1 - Basic Info */}
          <div className="space-y-4 sm:space-y-6">
            <FormField label="Gender" icon="👤">
              <select
                value={formData.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className="form-select w-full text-sm sm:text-base"
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
                className="form-input w-full text-sm sm:text-base"
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
                className="form-select w-full text-sm sm:text-base"
              >
                <option value="never">Never</option>
                <option value="former">Former</option>
                <option value="current">Current</option>
                <option value="ever">Sometimes</option>
                <option value="not current">Not Current</option>
                <option value="No Info">Unknow</option>
              </select>
            </FormField>
          </div>

          {/* Column 2 - Medical History */}
          <div className="space-y-4 sm:space-y-6">
            <FormField label="High Blood Pressure" icon="❤️">
              <div className="flex gap-3 sm:gap-4">
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input
                    type="radio"
                    checked={!formData.hypertension}
                    onChange={() => updateField("hypertension", false)}
                    className="form-radio"
                  />
                  <span className="text-gray-700 text-sm sm:text-base">No</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input
                    type="radio"
                    checked={formData.hypertension}
                    onChange={() => updateField("hypertension", true)}
                    className="form-radio"
                  />
                  <span className="text-gray-700 text-sm sm:text-base">Yes</span>
                </label>
              </div>
            </FormField>

            <FormField label="Heart Disease" icon="💔">
              <div className="flex gap-3 sm:gap-4">
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input
                    type="radio"
                    checked={!formData.heart_disease}
                    onChange={() => updateField("heart_disease", false)}
                    className="form-radio"
                  />
                  <span className="text-gray-700 text-sm sm:text-base">No</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input
                    type="radio"
                    checked={formData.heart_disease}
                    onChange={() => updateField("heart_disease", true)}
                    className="form-radio"
                  />
                  <span className="text-gray-700 text-sm sm:text-base">Yes</span>
                </label>
              </div>
            </FormField>

            <FormField label="Chiều cao (mét)" icon="📏">
              <input
                type="number"
                min="0.5"
                max="2.5"
                step="0.01"
                value={formData.height}
                onChange={(e) => updateField("height", parseFloat(e.target.value))}
                className="form-input w-full text-sm sm:text-base"
                placeholder="1.70"
              />
              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>0.5m</span>
                <span>2.5m</span>
              </div>
            </FormField>

            <FormField label="Cân nặng (kg)" icon="⚖️">
              <input
                type="number"
                min="20"
                max="200"
                step="0.5"
                value={formData.weight}
                onChange={(e) => updateField("weight", parseFloat(e.target.value))}
                className="form-input w-full text-sm sm:text-base"
                placeholder="70"
              />
              <div className="mt-2 p-3 bg-gradient-to-r from-emerald-50 to-red-50 rounded-lg border border-emerald-200">
                <p className="text-xs sm:text-sm font-semibold text-gray-700">
                  BMI: <span className={`font-bold ${
                    currentBMI < 18.5 ? 'text-blue-600' :
                    currentBMI < 25 ? 'text-green-600' :
                    currentBMI < 30 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>{currentBMI}</span>
                  <span className="text-gray-500 ml-2">
                    {currentBMI < 18.5 ? '(Gầy)' :
                     currentBMI < 25 ? '(Bình thường)' :
                     currentBMI < 30 ? '(Thừa cân)' :
                     '(Béo phì)'}
                  </span>
                </p>
              </div>
            </FormField>
          </div>

          {/* Column 3 - Clinical Measurements */}
          <div className="space-y-4 sm:space-y-6 md:col-span-2 xl:col-span-1">
            <FormField label="HbA1c Index (%)" icon="🩸">
              <input
                type="number"
                min="3"
                max="15"
                step="0.1"
                value={formData.hba1c}
                onChange={(e) => updateField("hba1c", parseFloat(e.target.value))}
                className="form-input w-full text-sm sm:text-base"
              />
              <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs sm:text-sm text-blue-700">
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
                className="form-input w-full text-sm sm:text-base"
              />
              <div className="mt-2 p-3 bg-pink-50 rounded-lg border border-pink-200">
                <p className="text-xs sm:text-sm text-pink-700">
                  {formData.glucose < 100 ? "✅ Normal" : 
                   formData.glucose < 126 ? "⚠️ Prediabetes" : 
                   "🔴 Diabetes"}
                </p>
              </div>
            </FormField>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 min-h-[48px] sm:min-h-[56px]"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-sm sm:text-base">Analyzing...</span>
              </>
            ) : (
              <>
                <span className="text-lg sm:text-xl">🚀</span>
                <span className="text-sm sm:text-base">ANALYZE RISK</span>
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
      <label className="block mb-2 sm:mb-3 text-sm sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
        <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform">{icon}</span>
        <span className="text-sm sm:text-base">{label}</span>
      </label>
      {children}
    </div>
  );
}
