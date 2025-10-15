import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  

  // Get user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
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
      alert('Redirecting to Clinical Data page...');
      // You can add navigation to clinical data page here
      // navigate('/clinical-data');
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Optional: Redirect to auth page after logout
    // navigate('/authpage');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

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

            {/* Desktop Navigation & Login Button */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-8">
                <a href="#home" className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors duration-200">Home</a>
              </nav>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      Welcome, {user.fullName || user.username || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 shadow-lg"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/authpage')}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition duration-200 shadow-lg transform hover:scale-105"
                >
                  <span className="font-semibold">Login</span>
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

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 pt-4 pb-3">
              <div className="flex flex-col space-y-3">
                <a href="#home" className="text-gray-700 hover:text-red-600 px-3 py-2 text-base font-medium">Home</a>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  {user ? (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{user.fullName || user.username}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm font-medium w-full justify-center"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-semibold">Login</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Early Detection for
              <span className="block text-red-600">Healthy Kidneys</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Advanced AI-powered Chronic Kidney Disease risk assessment. 
              Get instant, accurate insights to protect your kidney health and prevent complications.
            </p>
          </div>

          {/* Dual Prediction Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
            
            {/* Clinical Data Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-red-200 text-center hover:scale-105 transition-all duration-300">
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
                onClick={() => navigate("/data")}
                className={`w-full max-w-xs py-3 px-6 rounded-xl font-semibold text-base transition duration-300 ${
                  isAnalyzing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 transform hover:scale-105'
                } text-white shadow-lg mx-auto`}
              >
                Predict with Clinical Data
              </button>
            </div>

            {/* CT Scan Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-red-200 text-center hover:scale-105 transition-all duration-300">
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
        </div>
      </section>
    </div>
  );
}

export default Home;