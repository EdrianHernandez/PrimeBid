import React, { useState, useEffect } from 'react';
import { AuctionItem } from '../types';
import { Clock, TrendingUp, Flame } from 'lucide-react';

interface ActiveBidsGridProps {
  items: AuctionItem[];
  onPlaceBid: (itemId: string, amount: number) => void;
}

const CountdownTimer: React.FC<{ endTime: number }> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(endTime - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  if (timeLeft <= 0) return <span className="text-red-600 font-bold">Ended</span>;

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // High urgency styling if less than 5 minutes
  const isUrgent = timeLeft < 5 * 60 * 1000;

  return (
    <div className={`timer-text flex items-center gap-1.5 font-mono text-sm font-semibold ${isUrgent ? 'text-red-600 animate-pulse' : 'text-slate-700'}`}>
      <Clock className="w-4 h-4" />
      <span>
        {hours > 0 ? `${hours}h ` : ''}
        {minutes}m {seconds}s
      </span>
    </div>
  );
};

const BidCard: React.FC<{ item: AuctionItem; onPlaceBid: (id: string, amount: number) => void }> = ({ item, onPlaceBid }) => {
  const [isBidding, setIsBidding] = useState(false);

  const minBid = item.currentBid + (item.currentBid < 1000 ? 50 : 100);

  const handleQuickBid = () => {
    setIsBidding(true);
    // Simulate API delay
    setTimeout(() => {
        onPlaceBid(item.id, minBid);
        setIsBidding(false);
    }, 400);
  };

  return (
    <div className="bid-card group bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
           {item.isHot && (
            <span className="bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Flame className="w-3 h-3" /> HOT
            </span>
          )}
          <span className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {item.bids} Bids
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wide">
                {item.category}
            </span>
            <CountdownTimer endTime={item.endTime} />
        </div>

        <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {item.title}
        </h3>
        
        <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">
            {item.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-xs text-slate-400 font-medium mb-0.5">Current Bid</p>
              <p className="text-xl font-bold text-slate-900">
                ${item.currentBid.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
               <p className="text-xs text-slate-400 font-medium mb-0.5">Next Min.</p>
               <p className="text-sm font-semibold text-slate-600 font-mono">
                 ${minBid.toLocaleString()}
               </p>
            </div>
          </div>
          
          <button
            onClick={handleQuickBid}
            disabled={isBidding}
            className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isBidding ? (
                <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                </>
            ) : (
                <>
                    Place Bid <TrendingUp className="w-4 h-4" />
                </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ActiveBidsGrid: React.FC<ActiveBidsGridProps> = ({ items, onPlaceBid }) => {
  if (items.length === 0) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
                <Clock className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Active Auctions</h3>
            <p className="text-slate-500 max-w-sm">
                Try adjusting your search or category filters to find what you're looking for.
            </p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {items.map((item) => (
        <BidCard key={item.id} item={item} onPlaceBid={onPlaceBid} />
      ))}
    </div>
  );
};

export default ActiveBidsGrid;