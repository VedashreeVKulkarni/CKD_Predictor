import React, { useState } from "react";
import { UserCircle } from "lucide-react";

const x = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patients, setPatients] = useState([]);

  const handleAddPatient = () => {
    if (patientName.trim() === "") return;
    setPatients([...patients, patientName.trim()]);
    setPatientName("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 relative">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center p-4 bg-white shadow-md rounded-xl">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="p-2 hover:bg-gray-200 rounded-full transition"
        >
          <UserCircle size={30} className="text-gray-700" />
        </button>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium text-gray-600 mt-10">
          Welcome to your dashboard!
        </h2>
      </main>

      {/* Profile Section */}
      {showProfile && (
        <div className="absolute top-20 right-6 bg-white shadow-lg border rounded-2xl p-6 w-80 transition-all">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Add Patients
          </h3>

          {/* Input and Add button */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAddPatient}
              className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>

          {/* Patient List */}
          <ul className="max-h-40 overflow-y-auto">
            {patients.length > 0 ? (
              patients.map((p, index) => (
                <li
                  key={index}
                  className="py-1 border-b border-gray-200 text-gray-700"
                >
                  {p}
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No patients added yet.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default x;
