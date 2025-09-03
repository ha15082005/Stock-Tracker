import { NextRequest, NextResponse } from 'next/server';
import { StockService } from '@/src/lib/stock-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Use the new comprehensive search function
    const stocks = await StockService.searchStocks(query);
    
    return NextResponse.json({ stocks });
  } catch (error) {
    console.error('Error searching stocks:', error);
    return NextResponse.json(
      { error: 'Failed to search stocks' },
      { status: 500 }
    );
  }
}
