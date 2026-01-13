import React from 'react';
import { Search, Bell, User, Gavel } from 'lucide-react';

interface AuctionHeaderProps {
  userBalance: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AuctionHeader: React.FC<AuctionHeaderProps> = ({ userBalance, searchQuery, setSearchQuery }) => {
  return (
    <header className="auction-header sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Gavel className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
            Prime<span className="text-indigo-600">Bid</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 lg:mx-8 relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-full leading-5 bg-slate-50 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
            placeholder="Search for antiques, art, electronics..."
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Balance</span>
            <span className="text-sm font-bold text-slate-900 font-mono">
              ${userBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <button className="p-1 border-2 border-transparent hover:border-slate-200 rounded-full transition-all">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
              <User className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AuctionHeader;