const NOW = Date.now();

export const CATEGORIES = [
  'All',
  'Art',
  'Electronics',
  'Jewelry',
  'Antiques',
  'Collectibles',
  'Vehicles'
];

export const INITIAL_ITEMS = [
  {
    id: '1',
    title: 'Vintage Rolex Submariner',
    description: 'A pristine condition 1978 Rolex Submariner with original box and papers.',
    imageUrl: 'https://picsum.photos/id/175/400/300',
    currentBid: 12500,
    startingBid: 8000,
    endTime: NOW + 1000 * 60 * 45, // 45 mins left
    category: 'Jewelry',
    bids: 14,
    isHot: true,
  },
  {
    id: '2',
    title: 'Mid-Century Modern Chair',
    description: 'Authentic Eames Lounge Chair, leather finish, excellent condition.',
    imageUrl: 'https://picsum.photos/id/1084/400/300',
    currentBid: 3200,
    startingBid: 1500,
    endTime: NOW + 1000 * 60 * 12, // 12 mins left
    category: 'Antiques',
    bids: 8,
  },
  {
    id: '3',
    title: 'MacBook Pro M3 Max',
    description: 'Brand new, sealed in box. 16-inch, 64GB RAM, 2TB SSD.',
    imageUrl: 'https://picsum.photos/id/0/400/300',
    currentBid: 2800,
    startingBid: 2500,
    endTime: NOW + 1000 * 60 * 180, // 3 hours
    category: 'Electronics',
    bids: 5,
  },
  {
    id: '4',
    title: 'Abstract Oil Painting',
    description: 'Signed original oil on canvas by emerging artist. 24x36 inches.',
    imageUrl: 'https://picsum.photos/id/1015/400/300',
    currentBid: 850,
    startingBid: 500,
    endTime: NOW + 1000 * 60 * 5, // 5 mins left (Urgent!)
    category: 'Art',
    bids: 22,
    isHot: true,
  },
  {
    id: '5',
    title: '1967 Ford Mustang GT',
    description: 'Fully restored classic muscle car. V8 engine, manual transmission.',
    imageUrl: 'https://picsum.photos/id/111/400/300',
    currentBid: 45000,
    startingBid: 30000,
    endTime: NOW + 1000 * 60 * 60 * 24, // 24 hours
    category: 'Vehicles',
    bids: 3,
  },
  {
    id: '6',
    title: 'Rare First Edition Book',
    description: 'First edition of "The Great Gatsby" in fair condition.',
    imageUrl: 'https://picsum.photos/id/24/400/300',
    currentBid: 1500,
    startingBid: 1000,
    endTime: NOW + 1000 * 60 * 25, // 25 mins
    category: 'Collectibles',
    bids: 7,
  }
];
