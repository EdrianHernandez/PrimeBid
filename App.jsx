import React, { useState, useCallback, useMemo } from 'react';
import AuctionHeader from './components/AuctionHeader';
import ActiveBidsGrid from './components/ActiveBidsGrid';
import BiddingHistory from './components/BiddingHistory';
import CategorySidebar from './components/CategorySidebar';
import { INITIAL_ITEMS } from './constants';

const App = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [userBalance, setUserBalance] = useState(250000);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [history, setHistory] = useState([
     {
        id: 'init-1',
        itemId: '1',
        itemTitle: 'Vintage Rolex Submariner',
        amount: 12500,
        timestamp: Date.now() - 1000 * 60 * 5,
        user: 'Collector_88'
     },
     {
        id: 'init-2',
        itemId: '5',
        itemTitle: '1967 Ford Mustang GT',
        amount: 45000,
        timestamp: Date.now() - 1000 * 60 * 15,
        user: 'V8_Lover'
     }
  ]);

  const handlePlaceBid = useCallback((itemId, amount) => {
    // 1. Validation
    if (amount > userBalance) {
        alert("Insufficient funds!");
        return;
    }

    // 2. Update Item State
    setItems(prevItems => prevItems.map(item => {
        if (item.id === itemId) {
            return {
                ...item,
                currentBid: amount,
                bids: item.bids + 1
            };
        }
        return item;
    }));

    // 3. Update User Balance
    // Logic preserved: static balance for demo as per original comments.
    
    // 4. Update History
    const targetItem = items.find(i => i.id === itemId);
    if (targetItem) {
        const newHistoryItem = {
            id: Date.now().toString(),
            itemId: itemId,
            itemTitle: targetItem.title,
            amount: amount,
            timestamp: Date.now(),
            user: 'You'
        };
        setHistory(prev => [newHistoryItem, ...prev]);
    }

  }, [items, userBalance]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AuctionHeader 
        userBalance={userBalance} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Sidebar - Categories */}
            <CategorySidebar 
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            {/* Main Content - Grid */}
            <div className="flex-1 w-full min-w-0"> 
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Live Auctions</h1>
                        <p className="text-slate-500 mt-1">
                            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found in {selectedCategory}
                        </p>
                    </div>
                    <div className="hidden sm:block">
                        <select className="form-select bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
                            <option>Ending Soonest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Most Bids</option>
                        </select>
                    </div>
                </div>
                
                <ActiveBidsGrid 
                    items={filteredItems} 
                    onPlaceBid={handlePlaceBid}
                />
            </div>

            {/* Right Sidebar - History */}
            <div className="hidden xl:block">
                <BiddingHistory history={history} />
            </div>

            {/* Mobile History Section */}
            <div className="xl:hidden w-full mt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h3>
                <BiddingHistory history={history} />
            </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} PrimeBid Auctions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
