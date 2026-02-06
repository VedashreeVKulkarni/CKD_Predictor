import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    History,
    User,
    LogOut,
    Menu,
    X,
    Activity,
    ChevronRight
} from 'lucide-react';

const DashboardLayout = ({ children, user, onLogout }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'history', label: 'Patient History', icon: History, path: '/dashboard?section=history' },
        { id: 'profile', label: 'Profile', icon: User, path: '/dashboard?section=profile' },
    ];

    const handleNavigate = (path) => {
        navigate(path);
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 fixed h-full z-20">
                <div className="p-6 flex items-center gap-3 border-b border-slate-100">
                    <div className="bg-red-600 p-2 rounded-lg">
                        <Activity className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                        MediGuard AI
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (location.search.includes(item.id) && item.id !== 'dashboard') ||
                            (item.id === 'dashboard' && location.search === '' && location.pathname === '/dashboard');

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-red-50 text-red-700 font-semibold shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                <span>{item.label}</span>
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-red-400" />}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="bg-slate-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold">
                                {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-semibold text-sm truncate">{user?.fullName || 'User'}</p>
                                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-red-600 p-1.5 rounded-lg">
                        <Activity className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg text-slate-900">MediGuard</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 hover:bg-slate-100 rounded-lg"
                >
                    <Menu className="w-6 h-6 text-slate-600" />
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl p-4 flex flex-col animate-in slide-in-from-right">
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full"
                            >
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>
                        <nav className="space-y-2 flex-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigate(item.path)}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50"
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </nav>
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 mt-auto"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 pt-16 lg:pt-0 min-h-screen transition-all duration-300">
                <div className="p-4 lg:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
