import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Activity } from 'lucide-react';

const UploadScan = ({ user }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [ctResult, setCtResult] = useState(null);
    const [ctError, setCtError] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (event) => {
        if (event.target.files && event.target.files[0]) {
            handleFile(event.target.files[0]);
        }
    };

    const handleFile = (file) => {
        setSelectedFile(file);
        setCtResult(null);
        setCtError('');
    };

    const handlePredict = async () => {
        if (!selectedFile) {
            setCtError('Please select a CT scan before analyzing.');
            return;
        }
        setCtError('');
        setCtResult(null);
        setIsAnalyzing(true);

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            if (user?.email) {
                formData.append('patient_id', user.email);
            }

            const response = await fetch('/api/api/predict_ct', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to analyze CT scan');
            }

            const data = await response.json();
            setCtResult({
                prediction: data.prediction,
                confidence: data.confidence,
                heatmap: data.heatmap || null
            });
        } catch (error) {
            setCtError(error.message || 'Unexpected error during CT analysis');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Medical Image Analysis</h2>
                <p className="text-slate-500 mt-2">Upload a CT scan for instant AI-powered diagnostic insights</p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
                {/* Upload Area */}
                <div
                    className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${dragActive
                        ? 'border-red-500 bg-red-50'
                        : 'border-slate-300 hover:border-red-400 hover:bg-slate-50'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileSelect}
                        accept=".jpg,.jpeg,.png,.dicom,.dcm"
                    />

                    <div className="flex flex-col items-center pointer-events-none">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${selectedFile ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                            }`}>
                            {selectedFile ? <CheckCircle className="w-10 h-10" /> : <Upload className="w-10 h-10" />}
                        </div>

                        {selectedFile ? (
                            <>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">File Selected</h3>
                                <p className="text-slate-600 font-medium">{selectedFile.name}</p>
                                <p className="text-sm text-slate-400 mt-2">Click or drag to replace</p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Upload CT Scan</h3>
                                <p className="text-slate-500 max-w-sm mx-auto">
                                    Drag and drop your medical image here, or click to browse files
                                </p>
                                <p className="text-xs text-slate-400 mt-4 uppercase tracking-wide">
                                    Supports JPG, PNG, DICOM
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handlePredict}
                        disabled={!selectedFile || isAnalyzing}
                        className={`
              flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-200
              ${!selectedFile || isAnalyzing
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-red-200'
                            }
            `}
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Analyzing Scan...</span>
                            </>
                        ) : (
                            <>
                                <Activity className="w-5 h-5" />
                                <span>Run Analysis</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Error Message */}
                {ctError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 animate-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{ctError}</p>
                    </div>
                )}

                {/* Results Section */}
                {ctResult && (
                    <div className="mt-8 pt-8 border-t border-slate-100 animate-in slide-in-from-bottom-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-red-600" />
                            Analysis Results
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <p className="text-sm uppercase tracking-wide text-slate-500 mb-2">Diagnosis</p>
                                <p className="text-2xl font-bold text-slate-900 capitalize">
                                    {ctResult.prediction}
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <p className="text-sm uppercase tracking-wide text-slate-500 mb-2">Confidence Score</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-2xl font-bold text-slate-900">
                                        {ctResult.confidence}%
                                    </p>
                                    <div className="flex-1 h-3 bg-slate-200 rounded-full mb-2 ml-2 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${ctResult.confidence}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="text-sm uppercase tracking-wide text-slate-500 mb-3">Attention Heatmap</p>
                            <div className="bg-black rounded-2xl overflow-hidden flex items-center justify-center min-h-[400px]">
                                <img
                                    src={`data:image/png;base64,${ctResult.heatmap}`}
                                    alt="Analysis Heatmap"
                                    className="w-full h-auto object-contain max-h-[800px]"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadScan;
