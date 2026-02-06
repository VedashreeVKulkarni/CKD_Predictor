import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Overview from './dashboard/Overview';
import History from './dashboard/History';
import Profile from './dashboard/Profile';
import UploadScan from './dashboard/UploadScan';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
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

  // Future Prediction State
  const [futurePrediction, setFuturePrediction] = useState(null);
  const [futureError, setFutureError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Load user data
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
    } else {
      navigate('/');
    }

    // Handle routing based on query params
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section) {
      setActiveSection(section);
    } else {
      setActiveSection('dashboard');
    }
  }, [location, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleProfileUpdate = () => {
    const updatedUser = {
      ...user,
      fullName: profileData.fullName,
      age: profileData.age,
      gender: profileData.gender
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleFuturePrediction = async () => {
    if (!user?.email) {
      setFutureError('Please sign in to request a future prediction.');
      return;
    }

    setIsAnalyzing(true);
    setFutureError('');
    setFuturePrediction(null);
    try {
      const response = await fetch('/api/api/predictions/rnn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ patient_id: user.email })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to get future prediction');
      }

      const data = await response.json();
      setFuturePrediction({
        stage: data.predicted_stage_label || `Stage ${data.predicted_stage}`,
        confidence: data.confidence,
        daysToProgression: data.days_to_progression,
        historyUsed: data.history_used
      });
    } catch (error) {
      setFutureError(error.message || 'Unable to fetch future prediction.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'history':
        return <History user={user} />;
      case 'profile':
        return (
          <Profile
            user={user}
            profileData={profileData}
            setProfileData={setProfileData}
            onUpdate={handleProfileUpdate}
          />
        );
      case 'upload':
        return <UploadScan user={user} />;
      default:
        return (
          <Overview
            user={user}
            onNavigate={(path) => {
              if (path === 'clinical') navigate('/clinicaldata');
              else if (path === 'upload') setActiveSection('upload');
            }}
            onPredictFuture={handleFuturePrediction}
            futurePrediction={futurePrediction}
            futureError={futureError}
            isAnalyzing={isAnalyzing}
          />
        );
    }
  };

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;