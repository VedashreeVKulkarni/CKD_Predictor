import React, { useState } from 'react';

const ClinicalData = () => {
  const [formData, setFormData] = useState({
    // Numerical Features
    serum_creatinine: '',
    gfr: '',
    bun: '',
    serum_calcium: '',
    blood_pressure: '',
    water_intake: '',
    
    // Categorical Features
    family_history: '',
    weight_changes: '',
    stress_level: '',
    smoking: '',
    alcohol: '',
    painkiller_usage: '',
    diet: '',
    physical_activity: ''
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedClinicalReports, setSelectedClinicalReports] = useState(null);

  const handleClinicalReportSelect = (e) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    setSelectedClinicalReports(files);
    // Handle the uploaded files here
    console.log('Selected clinical reports:', files);
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Here you would integrate with your friend's ML model
    try {
      // Simulate API call to your friend's model
      // const response = await fetch('your-friend-model-api-endpoint', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const result = await response.json();
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle the actual response from your friend's model here
      console.log('Form data to send to ML model:', formData);
      
    } catch (error) {
      console.error('Error analyzing data:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-600 px-10 py-10">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Chronic Kidney Disease (CKD) Clinical Analysis
          </h1>
        </div>

        <div className="p-8">
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
      {/* Title and Upload on one line (responsive) */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-red-800 mb-3 md:mb-0">
          Patient Clinical Parameters
        </h2>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="clinical-report-upload"
            className="inline-block py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-base cursor-pointer transition duration-300"
          >
            Upload Clinical Report
          </label>
          <input
            id="clinical-report-upload"
            type="file"
            className="hidden"
            onChange={handleClinicalReportSelect}
            accept=".jpg,.jpeg,.png,.pdf"
            multiple
          />

 {selectedClinicalReports && selectedClinicalReports.length > 0 && (
            <div className="p-2 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-700 font-medium text-sm">
                📄 {selectedClinicalReports.length} file(s)
              </p>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Numerical Features Section */}
        <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2 border-red-200">
                  Laboratory Parameters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serum Creatinine (mg/dL)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="serum_creatinine"
                      value={formData.serum_creatinine}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                      placeholder="e.g., 1.0, 2.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GFR (mL/min/1.73m²)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="gfr"
                      value={formData.gfr}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                      placeholder="e.g., 45.0, 95.0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      BUN (mg/dL)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="bun"
                      value={formData.bun}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                      placeholder="e.g., 15.0, 60.0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serum Calcium (mg/dL)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="serum_calcium"
                      value={formData.serum_calcium}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                      placeholder="e.g., 8.0, 9.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Pressure
                    </label>
                    <input
                      type="text"
                      name="blood_pressure"
                      value={formData.blood_pressure}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                      placeholder="e.g., 120/80 or 140/90"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Water Intake (mL/day)
                    </label>
                    <input
                      type="number"
                      name="water_intake"
                      value={formData.water_intake}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                      placeholder="e.g., 1200, 2500"
                    />
                  </div>
                </div>
              </div>

              {/* Categorical Features Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2 border-red-200">
                  Lifestyle & History Parameters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Family History
                    </label>
                    <select
                      name="family_history"
                      value={formData.family_history}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight Changes
                    </label>
                    <select
                      name="weight_changes"
                      value={formData.weight_changes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                    >
                      <option value="">Select</option>
                      <option value="stable">Stable</option>
                      <option value="loss">Loss</option>
                      <option value="gain">Gain</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stress Level
                    </label>
                    <select
                      name="stress_level"
                      value={formData.stress_level}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                    >
                      <option value="">Select</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Smoking
                    </label>
                    <select
                      name="smoking"
                      value={formData.smoking}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alcohol Consumption
                    </label>
                    <select
                      name="alcohol"
                      value={formData.alcohol}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                    >
                      <option value="">Select</option>
                      <option value="none">None</option>
                      <option value="rarely">Rarely</option>
                      <option value="daily">Daily</option>
                      <option value="socially">Socially</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Painkiller Usage
                    </label>
                    <select
                      name="painkiller_usage"
                      value={formData.painkiller_usage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="occasional">Occasional</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diet Type
                    </label>
                    <select
                      name="diet"
                      value={formData.diet}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                    >
                      <option value="">Select</option>
                      <option value="balanced">Balanced</option>
                      <option value="high protein">High Protein</option>
                      <option value="low carb">Low Carb</option>
                      <option value="low salt">High Salt</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Physical Activity
                    </label>
                    <select
                      name="physical_activity"
                      value={formData.physical_activity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                    >
                      <option value="">Select</option>
                      <option value="daily">Daily</option>
                      <option value="occasional">Occasional</option>
                      <option value="rarely">Rarely</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className={`w-full max-w-md mx-auto block py-4 px-6 rounded-xl font-semibold text-lg transition duration-300 ${
                    isAnalyzing 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-700 transform hover:scale-105'
                  } text-white shadow-lg`}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Analyzing Clinical Data...
                    </div>
                  ) : (
                    'Analyze with ML Model'
                  )}
                </button>
              </div>
            </form>
    
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalData;