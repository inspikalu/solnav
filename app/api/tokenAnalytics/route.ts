import { NextResponse } from 'next/server';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const SOLANA_TOKENS = ['solana', 'serum', 'raydium']; 

interface TokenData {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_percentage_24h: number;
}

interface TokenAnalyticsResponse {
    tokens: TokenData[];
}

export async function GET() {
    try {
        const response = await fetch(
            `${COINGECKO_API_URL}?vs_currency=usd&ids=${SOLANA_TOKENS.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=true`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch token data from CoinGecko');
        }

        const data: TokenData[] = await response.json();

        const tokenAnalyticsResponse: TokenAnalyticsResponse = {
            tokens: data,
        };

        return NextResponse.json(tokenAnalyticsResponse);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
