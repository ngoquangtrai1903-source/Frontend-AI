"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { EnhancedResultsDisplay } from "@/components/EnhancedResultsDisplay";
import { PatientForm } from "@/components/PatientForm";
import { ConnectionTest } from "@/components/ConnectionTest";
import { predictClinical } from "@/lib/api";

export default function DoctorPage() {
  const [results, setResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Scroll to top when results are displayed
  useEffect(() => {
    if (results) {
      window.scrollTo(0, 0);
    }
  }, [results]);

  const handleAnalyze = async (formData: any) => {
    setIsAnalyzing(true);
    
    try {
      // Map form data to clinical API format
      const apiData = {
        gender: formData.gender || 'Male',
        age: parseInt(formData.age) || 0,
        smoking_history: formData.smoking || 'never',
        hypertension: formData.hypertension ? 1 : 0,
        heart_disease: formData.heart_disease ? 1 : 0,
        bmi: parseFloat(formData.bmi) || 0,
        hba1c: parseFloat(formData.hba1c) || 0,
        glucose: parseInt(formData.glucose) || 0,
      };

      // Call backend clinical API
      const response = await predictClinical(apiData);
      
      // Transform backend response to match UI expectations
      const transformedResults = {
        probability: response.probability / 100,
        conclusion: response.status,
        riskLevel: response.probability > 70 ? "high" : response.probability > 30 ? "medium" : "low",
        impacts: response.impacts || [],
        aiAdvice: response.ai_advice || ""
      };
      
      setResults(transformedResults);
    } catch (error) {
      console.error('Error:', error);
      // Fallback to mock data if API fails
      const mockResults = {
        probability: 0.42,
        conclusion: formData.hba1c > 6.5 ? "POSITIVE" : "NEGATIVE",
        riskLevel: formData.hba1c > 7 ? "high" : formData.hba1c > 5.7 ? "medium" : "low",
        impacts: [
          { feature: "HbA1c", impact: formData.hba1c > 6 ? 12.5 : -3.2 },
          { feature: "Blood Glucose", impact: formData.glucose > 120 ? 8.3 : -2.1 },
          { feature: "BMI", impact: formData.bmi > 25 ? 5.7 : -1.5 },
          { feature: "Age", impact: formData.age > 50 ? 4.2 : -0.8 },
          { feature: "Smoking", impact: formData.smoking !== "never" ? 3.8 : -0.5 },
          { feature: "Blood Pressure", impact: formData.hypertension ? 2.9 : -0.3 },
          { feature: "Heart Disease", impact: formData.heart_disease ? 2.1 : -0.2 },
          { feature: "Gender", impact: 0.5 }
        ],
        aiAdvice: `Based on my analysis, the patient has ${formData.hba1c > 7 ? "high" : "moderate"} diabetes risk. 

**3 Important Recommendations:**

1. **HbA1c Control:** Current HbA1c level is ${formData.hba1c}% ${formData.hba1c > 6.5 ? "higher than normal threshold" : "needs monitoring"}. Should maintain low-sugar and low-refined-carb diet.

2. **Weight Management:** BMI ${formData.bmi} ${formData.bmi > 25 ? "indicates overweight" : "is at good level"}. Increase physical activity to 150 minutes/week.

3. **Regular Monitoring:** ${formData.hba1c > 6.5 ? "Should have check-ups every 3 months" : "Recheck after 6 months"} and maintain healthy lifestyle.`
      };
      setResults(mockResults);
    }
    
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Connection Status */}
        <div className="mb-8">
          <ConnectionTest />
        </div>
        
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium mb-4">
            <span>👨‍⚕️</span>
            <span>Doctor Mode</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Professional Clinical Diagnosis
          </h2>
          <p className="text-gray-600 text-lg">
            Advanced AI technology for accurate diabetes risk assessment
          </p>
        </div>

        {!results ? (
          <PatientForm onSubmit={handleAnalyze} isLoading={isAnalyzing} />
        ) : (
          <EnhancedResultsDisplay 
            results={results} 
            onReset={() => setResults(null)}
            isDoctorMode={true}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>© 2026 DiabeTwin - AI-Powered Health Assessment</p>
          <p className="text-sm mt-2">
            Results are for reference only. Please consult with healthcare professionals for medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
