import React, { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, Activity, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const History = ({ user }) => {
    const [historyEntries, setHistoryEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user?.email) {
            setError('Please sign in to view your history.');
            setLoading(false);
            return;
        }

        const fetchHistory = async () => {
            try {
                const response = await fetch(`/api/api/predictions/history/${encodeURIComponent(user.email)}`);
                if (!response.ok) throw new Error('Failed to load history');
                const data = await response.json();
                setHistoryEntries(Array.isArray(data.history) ? data.history : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user]);

    const formatDateTime = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp);
        if (Number.isNaN(date.getTime())) return timestamp;
        return date.toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    const getEntryIcon = (type) => {
        const normalized = (type || '').toLowerCase();
        if (normalized.includes('scan')) return <FileText className="w-5 h-5 text-purple-600" />;
        if (normalized.includes('clinical')) return <Activity className="w-5 h-5 text-green-600" />;
        return <Clock className="w-5 h-5 text-blue-600" />;
    };

    const getEntryColor = (type) => {
        const normalized = (type || '').toLowerCase();
        if (normalized.includes('scan')) return 'bg-purple-50 border-purple-100';
        if (normalized.includes('clinical')) return 'bg-green-50 border-green-100';
        return 'bg-blue-50 border-blue-100';
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Loading patient history...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-center gap-4 text-red-700">
                <AlertCircle className="w-6 h-6" />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Patient History</h2>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                    {historyEntries.length} Records
                </span>
            </div>

            {historyEntries.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No History Found</h3>
                    <p className="text-slate-500">
                        Your medical analysis history will appear here once you perform a scan or clinical assessment.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {historyEntries.map((entry, index) => (
                        <HistoryCard
                            key={entry.id || index}
                            entry={entry}
                            formatDateTime={formatDateTime}
                            getEntryIcon={getEntryIcon}
                            getEntryColor={getEntryColor}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const HistoryCard = ({ entry, formatDateTime, getEntryIcon, getEntryColor }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const timestamp = entry.timestamp || entry.visit_date || entry.created_at;
    const type = entry.type || entry.entry_type || 'Update';

    return (
        <div className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${isExpanded ? 'shadow-md border-red-100 ring-1 ring-red-50' : 'shadow-sm border-slate-100 hover:border-red-100'}`}>
            <div
                className="p-5 flex items-center justify-between cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getEntryColor(type)}`}>
                        {getEntryIcon(type)}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 capitalize">{type.replace(/_/g, ' ')}</h4>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDateTime(timestamp)}</span>
                        </div>
                    </div>
                </div>
                <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
            </div>

            {isExpanded && (
                <div className="px-5 pb-5 pt-0 border-t border-slate-50">
                    <div className="mt-4 space-y-4">
                        {entry.prediction && (
                            <div className="bg-slate-50 rounded-xl p-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Analysis Results</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {Object.entries(entry.prediction).map(([key, value]) => (
                                        <div key={key}>
                                            <p className="text-xs text-slate-500 capitalize">{key}</p>
                                            <p className="font-semibold text-slate-900">{String(value)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {entry.clinical_data && (
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Clinical Parameters</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {Object.entries(entry.clinical_data).map(([key, value]) => (
                                        <div key={key} className="bg-white border border-slate-100 p-3 rounded-lg">
                                            <p className="text-xs text-slate-500 capitalize truncate" title={key.replace(/_/g, ' ')}>
                                                {key.replace(/_/g, ' ')}
                                            </p>
                                            <p className="font-medium text-slate-900 mt-1">{String(value)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default History;
