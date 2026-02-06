import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Activity, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const ClinicalData = () => {
  const navigate = useNavigate();
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
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const userDataRef = useRef(null);
  if (userDataRef.current === null) {
    userDataRef.current = JSON.parse(localStorage.getItem('user') || 'null');
  }
  const user = userDataRef.current;
  const patientId = user?.email || user?.username || 'anonymous';

  const handleClinicalReportSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedClinicalReports(files);
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
    setError('');
    setPrediction(null);

    try {
      // Convert blood pressure to number if it's in '120/80' format
      let bloodPressure = formData.blood_pressure;
      if (typeof bloodPressure === 'string' && bloodPressure.includes('/')) {
        const [systolic] = bloodPressure.split('/').map(Number);
        if (!isNaN(systolic)) {
          bloodPressure = systolic;
        }
      }

      const payload = {
        patient_id: patientId,
        clinical_data: {
          serum_creatinine: parseFloat(formData.serum_creatinine) || 0,
          gfr: parseFloat(formData.gfr) || 0,
          bun: parseFloat(formData.bun) || 0,
          serum_calcium: parseFloat(formData.serum_calcium) || 0,
          blood_pressure: typeof bloodPressure === 'number' ? bloodPressure : parseFloat(bloodPressure) || 0,
          water_intake: parseFloat(formData.water_intake) || 0,

          family_history: formData.family_history || 'no',
          weight_changes: formData.weight_changes || 'stable',
          stress_level: formData.stress_level || 'medium',
          smoking: formData.smoking || 'no',
          alcohol: formData.alcohol || 'none',
          painkiller_usage: formData.painkiller_usage || 'no',
          diet: formData.diet || 'balanced',
          physical_activity: formData.physical_activity || 'occasional'
        }
      };

      const response = await fetch('/api/api/predictions/rf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setPrediction({
        prediction: result.status === 'Positive' ? 1 : 0,
        probability: result.confidence ? result.confidence / 100 : 0.8,
        stage: result.stage ? `Stage ${result.stage}` : null,
        important_factors: [
          `eGFR: ${payload.clinical_data.gfr} mL/min/1.73m²`,
          `Serum Creatinine: ${payload.clinical_data.serum_creatinine} mg/dL`,
          `BUN: ${payload.clinical_data.bun} mg/dL`
        ],
        message: result.message || ''
      });

    } catch (error) {
      setError(`Failed to get prediction: ${error.message}. Please try again.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100">
          <div className="bg-gradient-to-r from-red-600 to-red-800 px-8 py-10 text-white">
            <h1 className="text-3xl font-bold mb-2">Clinical Assessment</h1>
            <p className="text-red-100">Enter your clinical parameters for a comprehensive AI analysis</p>
          </div>

          <div className="p-8">
            {/* Upload Section */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-1">Have a medical report?</h2>
                  <p className="text-slate-500 text-sm">Upload your lab report to auto-fill parameters (Coming Soon)</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium cursor-pointer hover:bg-slate-50 transition shadow-sm">
                    <Upload className="w-4 h-4" />
                    <span>Upload Report</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleClinicalReportSelect}
                      accept=".jpg,.jpeg,.png,.pdf"
                      multiple
                    />
                  </label>
                  {selectedClinicalReports && (
                    <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {selectedClinicalReports.length} file(s)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Lab Parameters */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-600" />
                  Laboratory Parameters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Serum Creatinine (mg/dL)" name="serum_creatinine" value={formData.serum_creatinine} onChange={handleInputChange} placeholder="e.g., 1.2" type="number" step="0.1" />
                  <InputField label="GFR (mL/min/1.73m²)" name="gfr" value={formData.gfr} onChange={handleInputChange} placeholder="e.g., 90" type="number" step="0.1" />
                  <InputField label="BUN (mg/dL)" name="bun" value={formData.bun} onChange={handleInputChange} placeholder="e.g., 15" type="number" step="0.1" />
                  <InputField label="Serum Calcium (mg/dL)" name="serum_calcium" value={formData.serum_calcium} onChange={handleInputChange} placeholder="e.g., 9.5" type="number" step="0.1" />
                  <InputField label="Blood Pressure" name="blood_pressure" value={formData.blood_pressure} onChange={handleInputChange} placeholder="e.g., 120/80" />
                  <InputField label="Water Intake (mL/day)" name="water_intake" value={formData.water_intake} onChange={handleInputChange} placeholder="e.g., 2000" type="number" />
                </div>
              </div>

              {/* Lifestyle Parameters */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-600" />
                  Lifestyle & History
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField label="Family History" name="family_history" value={formData.family_history} onChange={handleInputChange} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
                  <SelectField label="Weight Changes" name="weight_changes" value={formData.weight_changes} onChange={handleInputChange} options={[{ value: 'stable', label: 'Stable' }, { value: 'loss', label: 'Loss' }, { value: 'gain', label: 'Gain' }]} />
                  <SelectField label="Stress Level" name="stress_level" value={formData.stress_level} onChange={handleInputChange} options={[{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }]} />
                  <SelectField label="Smoking" name="smoking" value={formData.smoking} onChange={handleInputChange} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
                  <SelectField label="Alcohol Consumption" name="alcohol" value={formData.alcohol} onChange={handleInputChange} options={[{ value: 'none', label: 'None' }, { value: 'rarely', label: 'Rarely' }, { value: 'socially', label: 'Socially' }, { value: 'daily', label: 'Daily' }]} />
                  <SelectField label="Painkiller Usage" name="painkiller_usage" value={formData.painkiller_usage} onChange={handleInputChange} options={[{ value: 'no', label: 'No' }, { value: 'occasional', label: 'Occasional' }, { value: 'yes', label: 'Yes' }]} />
                  <SelectField label="Diet Type" name="diet" value={formData.diet} onChange={handleInputChange} options={[{ value: 'balanced', label: 'Balanced' }, { value: 'high protein', label: 'High Protein' }, { value: 'low carb', label: 'Low Carb' }, { value: 'low salt', label: 'Low Salt' }]} />
                  <SelectField label="Physical Activity" name="physical_activity" value={formData.physical_activity} onChange={handleInputChange} options={[{ value: 'daily', label: 'Daily' }, { value: 'occasional', label: 'Occasional' }, { value: 'rarely', label: 'Rarely' }]} />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing Clinical Data...</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" />
                      <span>Run AI Analysis</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Results Section */}
            {error && (
              <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 flex items-center gap-3 animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {prediction && (
              <div className="mt-8 animate-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Analysis Results</h3>
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className={`p-6 ${prediction.prediction === 1 ? 'bg-red-50' : 'bg-green-50'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${prediction.prediction === 1 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        <Activity className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className={`text-lg font-bold ${prediction.prediction === 1 ? 'text-red-900' : 'text-green-900'}`}>
                          {prediction.prediction === 1 ? 'High Risk of CKD Detected' : 'Low Risk of CKD Detected'}
                        </h4>
                        <p className={`${prediction.prediction === 1 ? 'text-red-700' : 'text-green-700'}`}>
                          Confidence: {(prediction.probability * 100).toFixed(1)}% {prediction.stage && `• ${prediction.stage}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {prediction.important_factors && (
                    <div className="p-6 border-t border-slate-100">
                      <h5 className="font-semibold text-slate-900 mb-3">Key Contributing Factors</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {prediction.important_factors.map((factor, index) => (
                          <div key={index} className="bg-slate-50 px-4 py-3 rounded-lg text-slate-700 text-sm font-medium border border-slate-100">
                            {factor}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {prediction.message && (
                    <div className="p-6 bg-slate-50 border-t border-slate-100 text-slate-600 text-sm">
                      {prediction.message}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const InputField = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-700">{label}</label>
    <input
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition outline-none"
      {...props}
    />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-700">{label}</label>
    <div className="relative">
      <select
        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition outline-none appearance-none bg-white"
        {...props}
      >
        <option value="">Select Option</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

export default ClinicalData;