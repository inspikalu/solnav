import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import CardLoader from './CardLoader';
import ErrorCard from './ErrorCard';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Interface for Token data
interface TokenData {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_percentage_24h: number;
    sparkline_in_7d: { price: number[] };
}

interface TokenAnalyticsResponse {
    tokens: TokenData[];
}
interface ITokenAnalyticsProps {
    clsName?: string
}
const TokenAnalytics: React.FC<ITokenAnalyticsProps> = ({ clsName }) => {
    const [tokens, setTokens] = useState<TokenData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTokenAnalytics = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/tokenAnalytics');
                const data: TokenAnalyticsResponse = await response.json();
                setTokens(data.tokens);
            } catch (error) {
                console.error('Error fetching token analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTokenAnalytics();
    }, []);

    if (loading) {
        return <CardLoader />;
    }

    if (!tokens?.length) {
        return <ErrorCard message='No data avialable' />;
    }

    return (
        <div className={`p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md ${clsName}`}>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-4">Token Performance Analytics</h2>
            {tokens.map((token) => (
                <div key={token.id} className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{token.name} ({token.symbol.toUpperCase()})</h3>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                        <span className="text-lg text-gray-800 dark:text-gray-200">Current Price: ${token.current_price.toFixed(2)}</span>
                        <span className="text-lg text-gray-800 dark:text-gray-200">Market Cap: ${token.market_cap.toLocaleString()}</span>
                        <span className="text-lg text-gray-800 dark:text-gray-200">24h Volume: ${token.total_volume.toLocaleString()}</span>
                        <span className={`text-lg ${token.price_change_percentage_24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            24h Change: {token.price_change_percentage_24h.toFixed(2)}%
                        </span>
                    </div>
                    <Line
                        data={{
                            labels: token.sparkline_in_7d?.price.map((_, index) => index),
                            datasets: [
                                {
                                    label: `${token.name} Price`,
                                    data: token.sparkline_in_7d?.price,
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                title: {
                                    display: true,
                                    text: `${token.name} Price Chart`,
                                },
                            },
                            scales: {
                                x: {
                                    type: 'linear',
                                    title: {
                                        display: true,
                                        text: 'Hours',
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Price (USD)',
                                    },
                                },
                            },
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default TokenAnalytics;