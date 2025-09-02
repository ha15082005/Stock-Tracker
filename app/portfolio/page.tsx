'use client';

import { Navigation } from '@/src/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Plus, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { formatCurrency, formatPercentage } from '@/src/lib/utils';

// Mock portfolio data
const mockPortfolio = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 10,
    averagePrice: 145.50,
    currentPrice: 150.25,
    totalValue: 1502.50,
    totalCost: 1455.00,
    gainLoss: 47.50,
    gainLossPercent: 3.26,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 5,
    averagePrice: 2700.00,
    currentPrice: 2750.80,
    totalValue: 13754.00,
    totalCost: 13500.00,
    gainLoss: 254.00,
    gainLossPercent: 1.88,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 8,
    averagePrice: 310.00,
    currentPrice: 320.45,
    totalValue: 2563.60,
    totalCost: 2480.00,
    gainLoss: 83.60,
    gainLossPercent: 3.37,
  },
];

export default function Portfolio() {
  const { data: session } = useSession();

  const totalPortfolioValue = mockPortfolio.reduce((sum, stock) => sum + stock.totalValue, 0);
  const totalPortfolioCost = mockPortfolio.reduce((sum, stock) => sum + stock.totalCost, 0);
  const totalGainLoss = totalPortfolioValue - totalPortfolioCost;
  const totalGainLossPercent = (totalGainLoss / totalPortfolioCost) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Portfolio
              </h1>
              <p className="text-gray-600">
                Track your investments and performance.
              </p>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Stock</span>
            </Button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalPortfolioValue)}
              </div>
              <p className="text-xs text-gray-500">
                Current portfolio value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalPortfolioCost)}
              </div>
              <p className="text-xs text-gray-500">
                Total amount invested
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalGainLoss)}
              </div>
              <p className={`text-xs ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(totalGainLossPercent)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Holdings</CardTitle>
              <span className="text-2xl font-bold">{mockPortfolio.length}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockPortfolio.length}
              </div>
              <p className="text-xs text-gray-500">
                Different stocks
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Holdings */}
        <Card>
          <CardHeader>
            <CardTitle>Your Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPortfolio.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{stock.symbol}</h3>
                        <p className="text-sm text-gray-600">{stock.name}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {stock.shares} shares @ {formatCurrency(stock.averagePrice)} avg
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(stock.totalValue)}
                    </div>
                    <div className={`text-sm ${stock.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(stock.gainLoss)} ({formatPercentage(stock.gainLossPercent)})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
