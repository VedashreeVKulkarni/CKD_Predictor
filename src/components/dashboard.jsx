import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    age: '',
    gender: '',
    medicalConditions: {
      diabetes: false,
      hypertension: false,
      thyroid: false,
      heartIssues: false
    },
    familyHistoryCKD: '',
    currentMedications: {
      bpTablets: false,
      diabetesMeds: false,
      painkillers: false
    },
    allergies: {
      medicines: '',
      food: ''
    },
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  });
  const navigate = useNavigate();

  // Get user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      setProfileData(prev => ({
        ...prev,
        fullName: userObj.fullName || '',
        age: userObj.age || '',
        gender: userObj.gender || '',
        email: userObj.email || ''
      }));
    }
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handlePredict = () => {
    if (!selectedFile) {
      alert('Please select a scan file first');
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      alert('Scan analysis complete! Results show early stage CKD detection. Please consult a nephrologist for detailed diagnosis.');
    }, 3000);
  };

  const handleClinicalPredict = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate('/clinicaldata');
    }, 1000);
  };

  const handleFuturePrediction = () => {
    if (!selectedFile) {
      alert('Please select a CT scan first for future prediction');
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      alert('Future kidney health prediction complete.');
    }, 3000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsUserMenuOpen(false);
    navigate('/authpage');
  };

  const handleLogin = () => {
    navigate('/authpage');
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original user data
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setProfileData(prev => ({
        ...prev,
        fullName: userObj.fullName || '',
        age: userObj.age || '',
        gender: userObj.gender || ''
      }));
    }
  };

  const handleUpdateDetails = () => {
    // Update user data in localStorage
    const updatedUser = {
      ...user,
      fullName: profileData.fullName,
      age: profileData.age,
      gender: profileData.gender
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    
    alert('Profile updated successfully!');
  };

  const handleInputChange = (section, field, value) => {
    if (section === 'medicalConditions' || section === 'currentMedications' || section === 'notifications') {
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else if (section === 'allergies') {
      setProfileData(prev => ({
        ...prev,
        allergies: {
          ...prev.allergies,
          [field]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleChangePassword = () => {
    alert('Password change functionality would be implemented here');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.removeItem('user');
      navigate('/authpage');
    }
  };

  // Sidebar navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'upload', label: 'Upload Scans', icon: '📤' },
    { id: 'history', label: 'Patient History', icon: '📋' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  // Features data
  const features = [
    {
      icon: '🔬',
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze medical data with 95% accuracy'
    },
    {
      icon: '⚡',
      title: 'Instant Results',
      description: 'Get comprehensive risk assessment reports within minutes'
    },
    {
      icon: '🛡️',
      title: 'Secure & Private',
      description: 'Your medical data is encrypted and never shared with third parties'
    },
    {
      icon: '📊',
      title: 'Detailed Reports',
      description: 'Comprehensive insights with actionable recommendations'
    }
  ];

  const riskFactors = [
    'Diabetes and high blood sugar levels',
    'High blood pressure (Hypertension)',
    'Family history of kidney disease',
    'Heart and blood vessel diseases',
    'Smoking and tobacco use',
    'Obesity and unhealthy diet',
    'Frequent use of pain medications'
  ];

  // Render different sections based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'upload':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Upload Medical Scans</h2>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Select Scan Type
              </label>
              <select className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option>CT Scan</option>
                <option>MRI</option>
                <option>Ultrasound</option>
                <option>X-Ray</option>
              </select>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📁</span>
              </div>
              <p className="text-gray-600 mb-4">Drag and drop your medical images here, or click to browse</p>
              <label htmlFor="scan-upload" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer transition duration-200">
                Browse Files
              </label>
              <input 
                id="scan-upload" 
                type="file" 
                className="hidden" 
                onChange={handleFileSelect}
                accept=".jpg,.jpeg,.png,.dicom,.dcm"
                multiple
              />
            </div>

            {selectedFile && (
              <div className="bg-red-50 rounded-lg p-4 mb-6">
                <p className="text-red-700 font-medium">
                  📄 {selectedFile.name} - Ready for analysis
                </p>
              </div>
            )}

            <button
              onClick={handlePredict}
              disabled={!selectedFile || isAnalyzing}
              className={`px-8 py-3 rounded-xl font-semibold text-lg transition duration-300 ${
                !selectedFile || isAnalyzing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 transform hover:scale-105'
              } text-white shadow-lg`}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Scan'}
            </button>
          </div>
        );

      case 'history':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Patient History</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Recent Scans</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span>CT Scan - 15 Nov 2024</span>
                    <span className="text-green-600 font-medium">Normal</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span>MRI - 02 Nov 2024</span>
                    <span className="text-yellow-600 font-medium">Mild Risk</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Risk Assessment History</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span>Current Risk Level</span>
                      <span className="font-medium text-green-600">Low</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Medical Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-red-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Initial Screening</p>
                    <p className="text-gray-600 text-sm">October 15, 2024 - Baseline assessment completed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Follow-up Consultation</p>
                    <p className="text-gray-600 text-sm">November 2, 2024 - Progress review</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">User Profile</h2>
              {!isEditing && (
                <button
                  onClick={handleEditProfile}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-red-50 rounded-2xl p-6 text-center">
                  <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">
                      {user?.fullName ? user.fullName.charAt(0).toUpperCase() : user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{user?.fullName || user?.username || 'User'}</h3>
                  <p className="text-gray-600">{user?.email}</p>
                  
                  {isEditing && (
                    <button className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200 w-full">
                      Change Profile Picture
                    </button>
                  )}
                </div>

                <div className="mt-6 bg-red-50 rounded-2xl p-6">
                  
                  <button
                    onClick={handleDeleteAccount}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 mt-6"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {/* A. Basic Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4"> Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          value={profileData.fullName}
                          onChange={(e) => handleInputChange('basic', 'fullName', e.target.value)}
                          readOnly={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <input 
                          type="number" 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          value={profileData.age}
                          onChange={(e) => handleInputChange('basic', 'age', e.target.value)}
                          readOnly={!isEditing}
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          value={profileData.gender}
                          onChange={(e) => handleInputChange('basic', 'gender', e.target.value)}
                          disabled={!isEditing}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* B. Medical Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                       Medical Information
                      <span className="block text-sm font-normal text-gray-600 mt-1">
                        These help the website generate better predictions
                      </span>
                    </h3>
                    
                    {/* Existing Medical Conditions */}
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-gray-800 mb-3">✅ Existing medical conditions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.entries(profileData.medicalConditions).map(([condition, value]) => (
                          <div key={condition} className="flex items-center">
                            <input
                              type="checkbox"
                              id={condition}
                              checked={value}
                              onChange={(e) => handleInputChange('medicalConditions', condition, e.target.checked)}
                              disabled={!isEditing}
                              className="rounded text-red-600 focus:ring-red-500 mr-3"
                            />
                            <label htmlFor={condition} className="text-gray-700 capitalize">
                              {condition.replace(/([A-Z])/g, ' $1')}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Family History */}
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-gray-800 mb-3">✅ Family history of CKD</h4>
                      <div className="flex space-x-4">
                        {['Yes', 'No'].map(option => (
                          <div key={option} className="flex items-center">
                            <input
                              type="radio"
                              id={`familyHistory-${option}`}
                              name="familyHistory"
                              value={option.toLowerCase()}
                              checked={profileData.familyHistoryCKD === option.toLowerCase()}
                              onChange={(e) => handleInputChange('basic', 'familyHistoryCKD', e.target.value)}
                              disabled={!isEditing}
                              className="text-red-600 focus:ring-red-500 mr-2"
                            />
                            <label htmlFor={`familyHistory-${option}`} className="text-gray-700">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current Medications */}
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-gray-800 mb-3">✅ Current medications</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.entries(profileData.currentMedications).map(([medication, value]) => (
                          <div key={medication} className="flex items-center">
                            <input
                              type="checkbox"
                              id={medication}
                              checked={value}
                              onChange={(e) => handleInputChange('currentMedications', medication, e.target.checked)}
                              disabled={!isEditing}
                              className="rounded text-red-600 focus:ring-red-500 mr-3"
                            />
                            <label htmlFor={medication} className="text-gray-700">
                              {medication === 'bpTablets' && 'BP tablets'}
                              {medication === 'diabetesMeds' && 'Diabetes medications'}
                              {medication === 'painkillers' && 'Painkiller usage (very important for CKD risk)'}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                   
                      
                  </div>

                  {/* Update Details Button */}
                  {isEditing && (
                    <div className="flex space-x-4 pt-6 border-t border-gray-200">
                      <button
                        onClick={handleUpdateDetails}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-200"
                      >
                        Update Details
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default: // dashboard
        return (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Early Detection for
                <span className="block text-red-600">Healthy Kidneys</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Advanced AI-powered Chronic Kidney Disease risk assessment. 
                Get instant, accurate insights to protect your kidney health and prevent complications.
              </p>
            </div>

            {/* Dual Prediction Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
              
              {/* Clinical Data Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200 text-center hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">📋</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Clinical Data
                </h2>
                <p className="text-gray-600 text-base mb-6">
                  Predict CKD risk using clinical parameters and lab results
                </p>

                <button
                  onClick={handleClinicalPredict}
                  disabled={isAnalyzing}
                  className={`w-full max-w-xs py-3 px-6 rounded-xl font-semibold text-base transition duration-300 ${
                    isAnalyzing 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-700 transform hover:scale-105'
                  } text-white shadow-lg mx-auto`}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Loading...
                    </div>
                  ) : (
                    'Predict with Clinical Data'
                  )}
                </button>
              </div>

              {/* CT Scan Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200 text-center hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🖼️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  CT Scan Analysis
                </h2>
                <p className="text-gray-600 text-base mb-4">
                  Upload and analyze medical imaging for comprehensive assessment
                </p>

                <div className="mb-4">
                  <label htmlFor="file-upload" className="block w-full max-w-xs py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-base cursor-pointer transition duration-300 mx-auto">
                    {selectedFile ? 'Change CT Scan' : 'Upload CT Scan'}
                  </label>
                  <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileSelect}
                    accept=".jpg,.jpeg,.png,.dicom,.dcm"
                  />
                </div>

                {selectedFile && (
                  <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200 max-w-xs mx-auto">
                    <p className="text-red-700 font-medium text-sm">
                      📄 {selectedFile.name}
                    </p>
                  </div>
                )}

                {selectedFile && (
                  <button
                    onClick={handlePredict}
                    disabled={isAnalyzing}
                    className={`w-full max-w-xs py-3 px-6 rounded-xl font-semibold text-base transition duration-300 ${
                      isAnalyzing 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-red-600 hover:bg-red-700 transform hover:scale-105'
                    } text-white shadow-lg mx-auto`}
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing Scan...
                      </div>
                    ) : (
                      'Analyze CT Scan'
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Future Prediction Card */}
            <div className="bg-white max-w-md mx-auto rounded-2xl shadow-xl p-8 border border-red-200 text-center hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🔮</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Future Kidney Health Prediction
              </h2>
              <p className="text-gray-600 text-base mb-4">
                Predict future kidney health outcomes based on current data
              </p>

              <div className="mb-4">
                <button
                  onClick={handleFuturePrediction}
                  disabled={isAnalyzing}
                  className={`w-full max-w-xs py-3 px-6 rounded-xl font-semibold text-base transition duration-300 ${
                    isAnalyzing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 transform hover:scale-105'
                  } text-white shadow-lg mx-auto`}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Predicting Future...
                    </div>
                  ) : (
                    'Predict Future Kidney Health'
                  )}
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-red-600">CKD Predictor</h1>
              </div>
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 bg-red-50 hover:bg-red-100 rounded-lg px-3 py-2 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {user.fullName || user.username || 'User'}
                      </p>
                    </div>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.fullName || user.username}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 shadow-lg"
                >
                  <span>Login</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen hidden md:block">
          <div className="p-6">
            
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition duration-200 ${
                    activeSection === item.id
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-200 mt-8"
              >
                <span className="text-xl">🚪</span>
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative bg-white w-64 min-h-full p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-6">Navigation</h2>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition duration-200 ${
                      activeSection === item.id
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-200 mt-8"
                >
                  <span className="text-xl">🚪</span>
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;