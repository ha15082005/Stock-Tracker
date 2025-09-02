'use client';

import { Navigation } from '@/src/components/navigation';
import { StockCard } from '@/src/components/stock-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Plus, Star, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

// Mock watchlist data
const mockWatchlist = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 150.25,
    change: 2.15,
    changePercent: 1.45,
    marketCap: 2500000000000,
    volume: 45000000,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    currentPrice: 850.30,
    change: 25.40,
    changePercent: 3.08,
    marketCap: 850000000000,
    volume: 35000000,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    currentPrice: 450.75,
    change: 12.30,
    changePercent: 2.81,
    marketCap: 1100000000000,
    volume: 25000000,
  },
];

export default function Watchlist() {
  const { data: session } = useSession();
  const [watchlist, setWatchlist] = useState(mockWatchlist);

  const handleRemoveFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(stock => stock.symbol !== symbol));
  };

  const totalMarketCap = watchlist.reduce((sum, stock) => sum + (stock.marketCap || 0), 0);
  const gainers = watchlist.filter(stock => stock.change > 0).length;
  const losers = watchlist.filter(stock => stock.change < 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Watchlist
              </h1>
              <p className="text-gray-600">
                Track your favorite stocks and stay updated with market movements.
              </p>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Stock</span>
            </Button>
          </div>
        </div>

        {/* Watchlist Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stocks</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{watchlist.length}</div>
              <p className="text-xs text-gray-500">
                Stocks in watchlist
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Market Cap</CardTitle>
              <span className="text-2xl font-bold">${(totalMarketCap / 1e12).toFixed(2)}T</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(totalMarketCap / 1e12).toFixed(2)}T
              </div>
              <p className="text-xs text-gray-500">
                Combined market cap
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gainers</CardTitle>
              <span className="text-2xl font-bold text-green-600">{gainers}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{gainers}</div>
              <p className="text-xs text-gray-500">
                Stocks in positive territory
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Losers</CardTitle>
              <span className="text-2xl font-bold text-red-600">{losers}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{losers}</div>
              <p className="text-xs text-gray-500">
                Stocks in negative territory
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Watchlist Stocks */}
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map((stock) => (
              <div key={stock.symbol} className="relative">
                <StockCard
                  {...stock}
                  isInWatchlist={true}
                  onRemoveFromWatchlist={handleRemoveFromWatchlist}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 p-1 h-8 w-8"
                  onClick={() => handleRemoveFromWatchlist(stock.symbol)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your watchlist is empty
              </h3>
              <p className="text-gray-500 mb-4">
                Start building your watchlist by adding stocks you want to track.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Stock
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
