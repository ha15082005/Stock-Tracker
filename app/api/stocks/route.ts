import { NextRequest, NextResponse } from 'next/server';
import { StockService } from '@/src/lib/stock-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbols = searchParams.get('symbols');
    
    if (!symbols) {
      return NextResponse.json(
        { error: 'Symbols parameter is required' },
        { status: 400 }
      );
    }

    const symbolList = symbols.split(',').map(s => s.trim().toUpperCase());
    const stocks = await StockService.getMultipleStocks(symbolList);
    
    return NextResponse.json({ stocks });
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}
