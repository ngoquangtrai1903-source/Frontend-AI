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

  const [errors, setErrors] = useState<string[]>([]);

  // Calculate BMI from height and weight
  const calculateBMI = (height: number, weight: number): number => {
    if (height <= 0 || weight <= 0) return 0;
    return Number((weight / (height * height)).toFixed(1));
  };

  const currentBMI = calculateBMI(formData.height, formData.weight);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Clear errors if validation passes
    setErrors([]);
    
    // Calculate BMI before submitting
    const calculatedBMI = calculateBMI(formData.height, formData.weight);
    onSubmit({
      ...formData,
      bmi: calculatedBMI
    });
  };

  const updateField = (field: string, value: any) => {
    // Allow all input but track validation state
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    // Validate height
    if (!formData.height || formData.height < 0.5 || formData.height > 2.5) {
      errors.push("Chiều cao phải từ 0.5m đến 2.5m");
    }
    
    // Validate weight
    if (!formData.weight || formData.weight < 20 || formData.weight > 300) {
      errors.push("Cân nặng phải từ 20kg đến 300kg");
    }
    
    // Validate age
    if (!formData.age || formData.age < 0 || formData.age > 120) {
      errors.push("Tuổi phải từ 0 đến 120");
    }
    
    // Validate HbA1c
    if (!formData.hba1c || formData.hba1c < 3 || formData.hba1c > 15) {
      errors.push("HbA1c phải từ 3% đến 15%");
    }
    
    // Validate glucose
    if (!formData.glucose || formData.glucose < 50 || formData.glucose > 500) {
      errors.push("Đường huyết phải từ 50 đến 500 mg/dL");
    }
    
    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-3xl sm:text-4xl">📋</span>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Patient Information</h3>
              <p className="text-blue-100 text-sm sm:text-base mt-1">Comprehensive health assessment form</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Error Display */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-red-600 text-xl">⚠️</span>
                <div>
                  <h4 className="text-red-800 font-semibold mb-2">Vui lòng kiểm tra lại các thông tin:</h4>
                  <ul className="space-y-1">
                    {errors.map((error, index) => (
                      <li key={index} className="text-red-700 text-sm">• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          {/* Personal Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Personal Information</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField label="Gender" icon="👤">
                <select
                  value={formData.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                  className="form-input w-full text-sm sm:text-base"
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
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>0 years</span>
                  <span>100 years</span>
                </div>
              </FormField>

              <FormField label="Smoking History" icon="🚬">
                <select
                  value={formData.smoking}
                  onChange={(e) => updateField("smoking", e.target.value)}
                  className="form-input w-full text-sm sm:text-base"
                >
                  <option value="never">Never</option>
                  <option value="former">Former</option>
                  <option value="current">Current</option>
                  <option value="ever">Sometimes</option>
                  <option value="not current">Not Current</option>
                  <option value="No Info">Unknown</option>
                </select>
              </FormField>
            </div>
          </div>

          {/* Medical History Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <span className="text-amber-600 font-semibold text-sm">2</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Medical History</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="High Blood Pressure" icon="❤️">
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      checked={!formData.hypertension}
                      onChange={() => updateField("hypertension", false)}
                      className="form-radio"
                    />
                    <span className="text-gray-700 font-medium">No</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border border-gray-200 hover:bg-red-50 transition-colors">
                    <input
                      type="radio"
                      checked={formData.hypertension}
                      onChange={() => updateField("hypertension", true)}
                      className="form-radio"
                    />
                    <span className="text-gray-700 font-medium">Yes</span>
                  </label>
                </div>
              </FormField>

              <FormField label="Heart Disease" icon="💔">
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      checked={!formData.heart_disease}
                      onChange={() => updateField("heart_disease", false)}
                      className="form-radio"
                    />
                    <span className="text-gray-700 font-medium">No</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border border-gray-200 hover:bg-red-50 transition-colors">
                    <input
                      type="radio"
                      checked={formData.heart_disease}
                      onChange={() => updateField("heart_disease", true)}
                      className="form-radio"
                    />
                    <span className="text-gray-700 font-medium">Yes</span>
                  </label>
                </div>
              </FormField>
            </div>
          </div>

          {/* Physical Measurements Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">3</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Physical Measurements</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField label="Height (meters)" icon="📏">
                <input
                  type="number"
                  min="0.5"
                  max="2.5"
                  step="0.01"
                  value={formData.height}
                  onChange={(e) => updateField("height", parseFloat(e.target.value))}
                  className={`form-input w-full text-sm sm:text-base ${
                    formData.height && (formData.height < 0.5 || formData.height > 2.5) 
                      ? 'border-red-300 focus:border-red-500' 
                      : ''
                  }`}
                  placeholder="1.70"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>0.5m</span>
                  <span>2.5m</span>
                </div>
                {formData.height && (formData.height < 0.5 || formData.height > 2.5) && (
                  <p className="mt-1 text-xs text-red-600">⚠️ Chiều cao không hợp lệ (0.5m - 2.5m)</p>
                )}
              </FormField>

              <FormField label="Weight (kg)" icon="⚖️">
                <input
                  type="number"
                  min="20"
                  max="300"
                  step="0.5"
                  value={formData.weight}
                  onChange={(e) => updateField("weight", parseFloat(e.target.value))}
                  className={`form-input w-full text-sm sm:text-base ${
                    formData.weight && (formData.weight < 20 || formData.weight > 300) 
                      ? 'border-red-300 focus:border-red-500' 
                      : ''
                  }`}
                  placeholder="70"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>20kg</span>
                  <span>300kg</span>
                </div>
                {formData.weight && (formData.weight < 20 || formData.weight > 300) && (
                  <p className="mt-1 text-xs text-red-600">⚠️ Cân nặng không hợp lệ (20kg - 300kg)</p>
                )}
              </FormField>

              <FormField label="BMI Status" icon="📊">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-red-50 rounded-lg border border-emerald-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{currentBMI}</p>
                    <p className={`text-sm font-medium mt-1 ${
                      currentBMI < 18.5 ? 'text-blue-600' :
                      currentBMI < 25 ? 'text-green-600' :
                      currentBMI < 30 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {currentBMI < 18.5 ? 'Underweight' :
                       currentBMI < 25 ? 'Normal' :
                       currentBMI < 30 ? 'Overweight' :
                       'Obese'}
                    </p>
                  </div>
                </div>
              </FormField>
            </div>
          </div>

          {/* Clinical Measurements Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">4</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Clinical Measurements</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <p className="text-sm text-blue-700 font-medium">
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
                  <p className="text-sm text-pink-700 font-medium">
                    {formData.glucose < 100 ? "✅ Normal" : 
                     formData.glucose < 126 ? "⚠️ Prediabetes" : 
                     "🔴 Diabetes"}
                  </p>
                </div>
              </FormField>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-h-[56px]"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span className="text-2xl">🚀</span>
                <span>Analyze Risk Assessment</span>
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
        <span>{label}</span>
      </label>
      {children}
    </div>
  );
}
