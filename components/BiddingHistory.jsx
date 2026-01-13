import React from 'react';
import { History, TrendingUp } from 'lucide-react';

const BiddingHistory = ({ history }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full lg:w-80 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-20">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <History className="w-4 h-4 text-indigo-600" />
                    Live Activity
                </h3>
                <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Live</span>
                </div>
            </div>
            
            <div className="max-h-[600px] overflow-y-auto">
                {history.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">
                        No recent activity
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100">
                        {history.map((bid) => (
                            <li key={bid.id} className="p-4 hover:bg-slate-50 transition-colors duration-150 animate-in fade-in slide-in-from-top-2">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-slate-500">
                                        {bid.user === 'You' ? (
                                            <span className="text-indigo-600">You</span>
                                        ) : (
                                            bid.user
                                        )}
                                    </span>
                                    <span className="text-xs text-slate-400 font-mono">{formatTime(bid.timestamp)}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="w-3 h-3 text-green-600" />
                                    <p className="text-sm font-medium text-slate-900 line-clamp-1">
                                        bid on <span className="font-bold">{bid.itemTitle}</span>
                                    </p>
                                </div>
                                <p className="text-lg font-bold text-slate-800 tracking-tight">
                                    ${bid.amount.toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-wide">
                    View Full History
                </button>
            </div>
        </div>
    </div>
  );
};

export default BiddingHistory;
