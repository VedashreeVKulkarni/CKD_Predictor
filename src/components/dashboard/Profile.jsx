import React, { useState } from 'react';
import { User, Mail, Calendar, Activity, Save, X, Trash2 } from 'lucide-react';

const Profile = ({ user, profileData, setProfileData, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);

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

    const handleSave = () => {
        onUpdate();
        setIsEditing(false);
    };

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Personal Profile</h2>
                    <p className="text-slate-500">Manage your health information and preferences</p>
                </div>
                <div className="flex gap-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 shadow-lg shadow-green-200 transition flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 shadow-lg transition"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - ID Card */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-red-500 to-red-600" />
                        <div className="relative z-10">
                            <div className="w-24 h-24 bg-white rounded-full p-1 mx-auto mb-4 shadow-lg">
                                <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-3xl font-bold text-slate-400">
                                    {user?.fullName?.charAt(0) || 'U'}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{user?.fullName || 'User'}</h3>
                            <p className="text-slate-500 text-sm mb-6">{user?.email}</p>

                            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Age</p>
                                    <p className="font-bold text-slate-900">{profileData.age || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Gender</p>
                                    <p className="font-bold text-slate-900 capitalize">{profileData.gender || '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-red-500" />
                            Health Summary
                        </h4>
                        <div className="space-y-3">
                            {Object.entries(profileData.medicalConditions).filter(([, v]) => v).map(([k]) => (
                                <div key={k} className="bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium capitalize">
                                    {k.replace(/([A-Z])/g, ' $1')}
                                </div>
                            ))}
                            {Object.values(profileData.medicalConditions).every(v => !v) && (
                                <p className="text-slate-400 text-sm italic">No conditions recorded</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Forms */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                        <h4 className="text-lg font-bold text-slate-900 mb-6">Basic Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                <input
                                    type="text"
                                    value={profileData.fullName}
                                    onChange={(e) => handleInputChange('basic', 'fullName', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-slate-50 disabled:text-slate-500 transition"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Age</label>
                                <input
                                    type="number"
                                    value={profileData.age}
                                    onChange={(e) => handleInputChange('basic', 'age', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-slate-50 disabled:text-slate-500 transition"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Gender</label>
                                <select
                                    value={profileData.gender}
                                    onChange={(e) => handleInputChange('basic', 'gender', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-slate-50 disabled:text-slate-500 transition"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Medical Details */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                        <h4 className="text-lg font-bold text-slate-900 mb-6">Medical Details</h4>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-3 block">Existing Conditions</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {Object.entries(profileData.medicalConditions).map(([key, value]) => (
                                        <label key={key} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${value ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200 hover:border-slate-300'
                                            } ${!isEditing && 'cursor-default'}`}>
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={(e) => handleInputChange('medicalConditions', key, e.target.checked)}
                                                disabled={!isEditing}
                                                className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                                            />
                                            <span className={`font-medium ${value ? 'text-red-700' : 'text-slate-600'}`}>
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-3 block">Current Medications</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {Object.entries(profileData.currentMedications).map(([key, value]) => (
                                        <label key={key} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${value ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200 hover:border-slate-300'
                                            } ${!isEditing && 'cursor-default'}`}>
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={(e) => handleInputChange('currentMedications', key, e.target.checked)}
                                                disabled={!isEditing}
                                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                            <span className={`font-medium ${value ? 'text-blue-700' : 'text-slate-600'}`}>
                                                {key === 'bpTablets' ? 'BP Tablets' :
                                                    key === 'diabetesMeds' ? 'Diabetes Meds' : 'Painkillers'}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
