import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { StockData } from '@/src/lib/stock-service';

// API functions
const fetchStocks = async (symbols: string[]): Promise<StockData[]> => {
  const response = await fetch(`/api/stocks?symbols=${symbols.join(',')}`);
  if (!response.ok) {
    throw new Error('Failed to fetch stocks');
  }
  const data = await response.json();
  return data.stocks;
};

const searchStocks = async (query: string): Promise<StockData[]> => {
  const response = await fetch(`/api/stocks/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search stocks');
  }
  const data = await response.json();
  return data.stocks;
};

const fetchMarketSummary = async () => {
  const response = await fetch('/api/stocks/market-summary');
  if (!response.ok) {
    throw new Error('Failed to fetch market summary');
  }
  return response.json();
};

// Custom hooks
export function useStocks(symbols: string[]) {
  return useQuery({
    queryKey: ['stocks', symbols],
    queryFn: () => fetchStocks(symbols),
    enabled: symbols.length > 0,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
}

export function useStockSearch(query: string) {
  return useQuery({
    queryKey: ['stockSearch', query],
    queryFn: () => searchStocks(query),
    enabled: query.length > 0,
    staleTime: 60000, // Keep search results for 1 minute
  });
}

export function useMarketSummary() {
  return useQuery({
    queryKey: ['marketSummary'],
    queryFn: fetchMarketSummary,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}

export function useStockData(symbol: string) {
  return useQuery({
    queryKey: ['stock', symbol],
    queryFn: () => fetchStocks([symbol]).then(stocks => stocks[0]),
    enabled: !!symbol,
    refetchInterval: 15000, // Refetch every 15 seconds
    staleTime: 5000, // Consider data stale after 5 seconds
  });
}

// Mutation for refreshing stock data
export function useRefreshStocks() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (symbols: string[]) => fetchStocks(symbols),
    onSuccess: (data) => {
      // Update the stocks query cache
      queryClient.setQueryData(['stocks', data.map(s => s.symbol)], data);
      
      // Update individual stock caches
      data.forEach(stock => {
        queryClient.setQueryData(['stock', stock.symbol], stock);
      });
    },
  });
}
