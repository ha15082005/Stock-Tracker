import { NextResponse } from 'next/server';
import { StockService } from '@/src/lib/stock-service';

export async function GET() {
  try {
    const marketSummary = await StockService.getMarketSummary();
    
    return NextResponse.json(marketSummary);
  } catch (error) {
    console.error('Error fetching market summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market summary' },
      { status: 500 }
    );
  }
}
