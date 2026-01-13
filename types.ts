export interface AuctionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  currentBid: number;
  startingBid: number;
  endTime: number; // Timestamp
  category: string;
  bids: number; // count of bids
  isHot?: boolean;
}

export interface BidHistoryItem {
  id: string;
  itemId: string;
  itemTitle: string;
  amount: number;
  timestamp: number;
  user: string;
}

export type Category = 'All' | 'Art' | 'Electronics' | 'Jewelry' | 'Antiques' | 'Collectibles' | 'Vehicles';