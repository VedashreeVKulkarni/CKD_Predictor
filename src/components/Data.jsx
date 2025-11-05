import React, { useState } from "react";

const Data = () => {
  const [formData, setFormData] = useState({
    serum_creatinine: "",
    gfr: "",
    bun: "",
    serum_calcium: "",
    blood_pressure: "",
    water_intake: "",
    family_history: "",
    weight_changes: "",
    stress_level: "",
    smoking: "",
    alcohol: "",
    painkiller_usage: "",
    diet: "",
    physical_activity: "",
  });

  const [report, setReport] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  // handle text/select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle medical report upload
  const handleReportUpload = (e) => {
    const file = e.target.files[0];
    if (file) setReport(file);
  };

  // handle form submission with backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setPrediction(data.prediction);
        setApiResponse(data);
        alert('Data submitted and stored successfully!');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      
      // Fallback to local prediction
      handleLocalPrediction();
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback local prediction
  const handleLocalPrediction = () => {
    const { serum_creatinine, gfr, bun } = formData;
    
    // Convert to numbers for comparison
    const cr = parseFloat(serum_creatinine) || 0;
    const gfrVal = parseFloat(gfr) || 0;
    const bunVal = parseFloat(bun) || 0;
    
    if (cr > 1.3 || gfrVal < 60 || bunVal > 20) {
      setPrediction("⚠️ Risk Detected: Possible Early CKD Signs");
    } else {
      setPrediction("✅ Normal Range: No CKD Risk Detected");
    }
  };

  // Function to clear form
  const handleClearForm = () => {
    setFormData({
      serum_creatinine: "",
      gfr: "",
      bun: "",
      serum_calcium: "",
      blood_pressure: "",
      water_intake: "",
      family_history: "",
      weight_changes: "",
      stress_level: "",
      smoking: "",
      alcohol: "",
      painkiller_usage: "",
      diet: "",
      physical_activity: "",
    });
    setPrediction(null);
    setApiResponse(null);
    setReport(null);
  };

  // Function to validate form before submission
  const validateForm = () => {
    const requiredFields = ['serum_creatinine', 'gfr', 'bun'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.join(', ')}`);
      return false;
    }
    return true;
  };

  // Enhanced submit handler with validation
  const handleSubmitWithValidation = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await handleSubmit(e);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-red-200">
        {/* Upload Medical Report */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-red-600">
            CKD Early Detection
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleClearForm}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200 shadow-lg"
            >
              Clear Form
            </button>
            <label className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer transition duration-200 shadow-lg">
              Upload Medical Report
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleReportUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Clinical Data Form */}
        <form onSubmit={handleSubmitWithValidation} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Quantitative Fields */}
          <div>
            <input
              type="number"
              name="serum_creatinine"
              placeholder="Serum Creatinine (mg/dL)*"
              value={formData.serum_creatinine}
              onChange={handleChange}
              step="0.1"
              min="0"
              className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Normal: 0.6-1.3 mg/dL</p>
          </div>

          <div>
            <input
              type="number"
              name="gfr"
              placeholder="GFR (mL/min/1.73m²)*"
              value={formData.gfr}
              onChange={handleChange}
              step="1"
              min="0"
              className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Normal: &gt;90 mL/min/1.73m²</p>
          </div>

          <div>
            <input
              type="number"
              name="bun"
              placeholder="BUN (mg/dL)*"
              value={formData.bun}
              onChange={handleChange}
              step="1"
              min="0"
              className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Normal: 7-20 mg/dL</p>
          </div>

          <input
            type="number"
            name="serum_calcium"
            placeholder="Serum Calcium (mg/dL)"
            value={formData.serum_calcium}
            onChange={handleChange}
            step="0.1"
            min="0"
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          />

          <input
            type="number"
            name="blood_pressure"
            placeholder="Blood Pressure (mmHg)"
            value={formData.blood_pressure}
            onChange={handleChange}
            step="1"
            min="0"
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          />

          <input
            type="number"
            name="water_intake"
            placeholder="Water Intake (liters/day)"
            value={formData.water_intake}
            onChange={handleChange}
            step="0.1"
            min="0"
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          />

          {/* Qualitative Fields */}
          <select
            name="family_history"
            value={formData.family_history}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Family History of Kidney Disease</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            name="weight_changes"
            value={formData.weight_changes}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Recent Weight Changes</option>
            <option value="Loss">Weight Loss</option>
            <option value="Gain">Weight Gain</option>
            <option value="No Change">No Change</option>
          </select>

          <select
            name="stress_level"
            value={formData.stress_level}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Stress Level</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>

          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Smoking Habit</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Alcohol Consumption</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            name="painkiller_usage"
            value={formData.painkiller_usage}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Painkiller Usage</option>
            <option value="Frequent">Frequent</option>
            <option value="Occasional">Occasional</option>
            <option value="None">None</option>
          </select>

          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Diet Type</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Mixed">Mixed</option>
          </select>

          <select
            name="physical_activity"
            value={formData.physical_activity}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Physical Activity Level</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`col-span-1 sm:col-span-2 text-white font-medium py-3 rounded-lg transition duration-200 shadow-lg transform hover:scale-105 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              'Predict CKD Risk'
            )}
          </button>
        </form>

        {/* Uploaded file name */}
        {report && (
          <p className="mt-4 text-sm text-gray-600">
            📄 Uploaded Report: <strong>{report.name}</strong>
          </p>
        )}

        {/* Output */}
        {prediction && (
          <div className={`mt-6 p-4 border rounded-xl text-center font-semibold ${
            prediction.includes('HIGH RISK') 
              ? 'bg-red-100 border-red-400 text-red-800' 
              : prediction.includes('MODERATE') 
              ? 'bg-yellow-100 border-yellow-400 text-yellow-800'
              : prediction.includes('LOW RISK')
              ? 'bg-blue-100 border-blue-400 text-blue-800'
              : 'bg-green-100 border-green-400 text-green-800'
          }`}>
            <div className="text-lg mb-2">{prediction}</div>
            {apiResponse && (
              <div className="text-sm text-gray-600 mt-2">
                {apiResponse.risk_factors && apiResponse.risk_factors.length > 0 && (
                  <div>
                    <strong>Risk Factors:</strong> {apiResponse.risk_factors.join(', ')}
                  </div>
                )}
                <div className="mt-1">
                  Record ID: {apiResponse.record_id} | Risk Level: <span className="font-bold">{apiResponse.risk_level}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Form Instructions */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">📋 Form Instructions:</h3>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Fields marked with * are required</li>
            <li>Fill in your latest lab test results</li>
            <li>Be honest about lifestyle factors for accurate assessment</li>
            <li>Upload medical reports if available (optional)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Data;