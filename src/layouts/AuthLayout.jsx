import React from 'react';
import { Activity } from 'lucide-react';
import authBg from '../assets/auth-bg.png';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* Left Side - Brand/Visual */}
                <div className="md:w-1/2 bg-gradient-to-br from-red-600 to-red-800 p-12 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${authBg})` }} />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
                                <Activity className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">MediGuard AI</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                            Advanced Medical <br />
                            <span className="text-red-200">Diagnostics</span>
                        </h1>
                        <p className="text-red-100 text-lg leading-relaxed max-w-md">
                            Leveraging state-of-the-art AI to provide instant, accurate analysis of medical imaging and clinical data.
                        </p>
                    </div>

                    <div className="relative z-10 flex gap-4 text-sm font-medium text-red-200">
                        <span>Privacy First</span>
                        <span>•</span>
                        <span>High Precision</span>
                        <span>•</span>
                        <span>24/7 Available</span>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
                            <p className="text-slate-500">{subtitle}</p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
