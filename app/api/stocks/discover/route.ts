import { NextRequest, NextResponse } from 'next/server';
import { StockService } from '@/src/lib/stock-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'symbol'; // 'symbol', 'name', 'all'
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    let stocks = [];
    
    if (type === 'name') {
      // Search by company name patterns
      stocks = await StockService.searchStocksByName(query);
    } else if (type === 'all') {
      // Try both symbol and name search
      const symbolResults = await StockService.searchStocks(query);
      const nameResults = await StockService.searchStocksByName(query);
      
      // Combine and remove duplicates
      const allStocks = [...symbolResults, ...nameResults];
      stocks = allStocks.filter((stock, index, self) => 
        index === self.findIndex(s => s.symbol === stock.symbol)
      );
    } else {
      // Default: symbol search
      stocks = await StockService.searchStocks(query);
    }
    
    return NextResponse.json({ 
      stocks,
      searchType: type,
      query,
      resultsCount: stocks.length
    });
  } catch (error) {
    console.error('Error discovering stocks:', error);
    return NextResponse.json(
      { error: 'Failed to discover stocks' },
      { status: 500 }
    );
  }
}
