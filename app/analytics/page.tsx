'use client';

import { Navigation } from '@/src/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { BarChart3, TrendingUp, Calendar, Filter } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

// Mock analytics data
const mockPerformanceData = [
  { month: 'Jan', return: 2.5, benchmark: 1.8 },
  { month: 'Feb', return: 3.2, benchmark: 2.1 },
  { month: 'Mar', return: -1.5, benchmark: -0.8 },
  { month: 'Apr', return: 4.1, benchmark: 3.2 },
  { month: 'May', return: 2.8, benchmark: 2.5 },
  { month: 'Jun', return: 5.2, benchmark: 4.1 },
];

const mockSectorAllocation = [
  { sector: 'Technology', allocation: 45, performance: 8.2 },
  { sector: 'Healthcare', allocation: 20, performance: 3.1 },
  { sector: 'Financial', allocation: 15, performance: -1.5 },
  { sector: 'Consumer', allocation: 12, performance: 2.8 },
  { sector: 'Energy', allocation: 8, performance: -2.1 },
];

export default function Analytics() {
  const { data: session } = useSession();
  const [timeframe, setTimeframe] = useState('6M');

  const totalReturn = mockPerformanceData.reduce((sum, data) => sum + data.return, 0);
  const avgMonthlyReturn = totalReturn / mockPerformanceData.length;
  const bestMonth = Math.max(...mockPerformanceData.map(d => d.return));
  const worstMonth = Math.min(...mockPerformanceData.map(d => d.return));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Analytics
              </h1>
              <p className="text-gray-600">
                Deep dive into your portfolio performance and insights.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{timeframe}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                +{totalReturn.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-500">
                Over {timeframe} period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Monthly</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {avgMonthlyReturn.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-500">
                Monthly average return
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                +{bestMonth.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-500">
                Highest monthly return
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Worst Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {worstMonth.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-500">
                Lowest monthly return
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Performance vs Benchmark</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-center space-x-2">
              {mockPerformanceData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="flex flex-col items-center space-y-1">
                    <div 
                      className="w-8 bg-blue-600 rounded-t"
                      style={{ height: `${Math.abs(data.return) * 10}px` }}
                    ></div>
                    <div 
                      className="w-8 bg-gray-400 rounded-t"
                      style={{ height: `${Math.abs(data.benchmark) * 10}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-sm text-gray-600">Your Portfolio</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded"></div>
                <span className="text-sm text-gray-600">Benchmark (S&P 500)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sector Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Sector Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSectorAllocation.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{sector.sector}</span>
                        <span className="text-sm text-gray-600">{sector.allocation}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${sector.allocation}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className={`ml-4 text-sm font-medium ${
                      sector.performance >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {sector.performance >= 0 ? '+' : ''}{sector.performance.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Volatility</span>
                  <span className="text-sm font-medium">12.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sharpe Ratio</span>
                  <span className="text-sm font-medium">1.24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Max Drawdown</span>
                  <span className="text-sm font-medium text-red-600">-8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Beta</span>
                  <span className="text-sm font-medium">0.95</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Alpha</span>
                  <span className="text-sm font-medium text-green-600">+2.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
