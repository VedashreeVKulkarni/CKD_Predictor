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

  // handle form submission (mock CKD prediction)
  const handleSubmit = (e) => {
    e.preventDefault();

    // simple mock prediction logic (replace with model API later)
    const { serum_creatinine, gfr, bun } = formData;
    if (serum_creatinine > 1.3 || gfr < 60 || bun > 20) {
      setPrediction("⚠️ Risk Detected: Possible Early CKD Signs");
    } else {
      setPrediction("✅ Normal Range: No CKD Risk Detected");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-red-200">
        {/* Upload Medical Report */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-red-600">
            CKD Early Detection
          </h2>
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

        {/* Clinical Data Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Quantitative Fields */}
          <input
            type="number"
            name="serum_creatinine"
            placeholder="Serum Creatinine (mg/dL)"
            value={formData.serum_creatinine}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          />
          <input
            type="number"
            name="gfr"
            placeholder="GFR (mL/min/1.73m²)"
            value={formData.gfr}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          />
          <input
            type="number"
            name="bun"
            placeholder="BUN (mg/dL)"
            value={formData.bun}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          />
          <input
            type="number"
            name="serum_calcium"
            placeholder="Serum Calcium (mg/dL)"
            value={formData.serum_calcium}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          />
          <input
            type="number"
            name="blood_pressure"
            placeholder="Blood Pressure (mmHg)"
            value={formData.blood_pressure}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          />
          <input
            type="number"
            name="water_intake"
            placeholder="Water Intake (liters/day)"
            value={formData.water_intake}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          />

          {/* Qualitative Fields */}
          <select
            name="family_history"
            value={formData.family_history}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Family History</option>
            <option>Yes</option>
            <option>No</option>
          </select>

          <select
            name="weight_changes"
            value={formData.weight_changes}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Weight Changes</option>
            <option>Loss</option>
            <option>Gain</option>
            <option>No Change</option>
          </select>

          <select
            name="stress_level"
            value={formData.stress_level}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Stress Level</option>
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
          </select>

          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Smoking</option>
            <option>Yes</option>
            <option>No</option>
          </select>

          <select
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Alcohol Consumption</option>
            <option>Yes</option>
            <option>No</option>
          </select>

          <select
            name="painkiller_usage"
            value={formData.painkiller_usage}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Painkiller Usage</option>
            <option>Frequent</option>
            <option>Occasional</option>
            <option>None</option>
          </select>

          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Diet Type</option>
            <option>Vegetarian</option>
            <option>Non-Vegetarian</option>
            <option>Mixed</option>
          </select>

          <select
            name="physical_activity"
            value={formData.physical_activity}
            onChange={handleChange}
            className="p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-200"
          >
            <option value="">Physical Activity</option>
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition duration-200 shadow-lg transform hover:scale-105"
          >
            Predict CKD Risk
          </button>
        </form>

        {/* Uploaded file name */}
        {report && (
          <p className="mt-4 text-sm text-gray-600">
            Uploaded Report: <strong>{report.name}</strong>
          </p>
        )}

        {/* Output */}
        {prediction && (
          <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-xl text-center text-red-800 font-semibold">
            {prediction}
          </div>
        )}
      </div>
    </div>
  );
};

export default Data;