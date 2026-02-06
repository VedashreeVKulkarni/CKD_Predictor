import React from 'react';
import { Activity, Zap, Shield, FileText, AlertCircle } from 'lucide-react';
import heroBg from '../../assets/hero-bg.png';

const Overview = ({ onNavigate, onPredictFuture, futurePrediction, futureError, isAnalyzing }) => {
    const features = [
        {
            icon: Activity,
            title: 'AI-Powered Analysis',
            description: 'Advanced machine learning algorithms analyze medical data for precise insights',
            color: 'bg-blue-100 text-blue-600'
        },
        {
            icon: Zap,
            title: 'Instant Results',
            description: 'Get comprehensive risk assessment reports within minutes',
            color: 'bg-amber-100 text-amber-600'
        },
        {
            icon: Shield,
            title: 'Secure & Private',
            description: 'Your medical data is encrypted and never shared with third parties',
            color: 'bg-green-100 text-green-600'
        },
        {
            icon: FileText,
            title: 'Detailed Reports',
            description: 'Comprehensive insights with actionable recommendations',
            color: 'bg-purple-100 text-purple-600'
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
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        Advanced Kidney Disease <br /> Detection & Prevention
                    </h1>
                    <p className="text-red-100 text-lg mb-8 leading-relaxed">
                        Early detection is key to managing Chronic Kidney Disease (CKD).
                        Our AI-powered tools help you monitor your health and identify risks early.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => onNavigate('upload')}
                            className="bg-white text-red-700 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-red-50 transition transform hover:scale-105"
                        >
                            Analyze CT Scan
                        </button>
                        <button
                            onClick={() => onNavigate('clinical')}
                            className="bg-red-900/30 backdrop-blur-sm border border-red-400/30 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-900/50 transition"
                        >
                            Clinical Assessment
                        </button>
                    </div>
                </div>
            </div>

            {/* Future Prediction Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                            <Activity className="text-purple-600 w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Future Health Prognosis</h2>
                            <p className="text-slate-500">AI-driven prediction of CKD progression based on your history</p>
                        </div>
                    </div>
                    <button
                        onClick={onPredictFuture}
                        disabled={isAnalyzing}
                        className="bg-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <Zap className="w-4 h-4" />
                                <span>Predict Progression</span>
                            </>
                        )}
                    </button>
                </div>

                {futureError && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 mb-6 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        {futureError}
                    </div>
                )}

                {futurePrediction && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-4">
                        <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                            <p className="text-sm uppercase tracking-wide text-purple-600 font-semibold mb-2">Predicted Stage</p>
                            <p className="text-3xl font-bold text-slate-900">{futurePrediction.stage}</p>
                            <p className="text-sm text-slate-500 mt-2">Based on recent trends</p>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                            <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold mb-2">Confidence</p>
                            <p className="text-3xl font-bold text-slate-900">{futurePrediction.confidence}%</p>
                            <div className="w-full bg-blue-200 h-2 rounded-full mt-3 overflow-hidden">
                                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${futurePrediction.confidence}%` }} />
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                            <p className="text-sm uppercase tracking-wide text-green-600 font-semibold mb-2">Days to Progression</p>
                            <p className="text-3xl font-bold text-slate-900">{futurePrediction.daysToProgression}</p>
                            <p className="text-sm text-slate-500 mt-2">Estimated timeline</p>
                        </div>
                    </div>
                )}

                {!futurePrediction && !futureError && (
                    <div className="bg-slate-50 rounded-2xl p-8 text-center border border-dashed border-slate-200">
                        <p className="text-slate-500">Click "Predict Progression" to generate an AI forecast of your kidney health.</p>
                    </div>
                )}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                            <feature.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* Risk Factors */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="text-red-600 w-6 h-6" />
                    <h2 className="text-2xl font-bold text-slate-900">Common Risk Factors</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {riskFactors.map((factor, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-slate-700 font-medium">{factor}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Overview;
