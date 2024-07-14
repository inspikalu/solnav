import React, { useEffect, useState } from 'react';
import TableLoader from './TableLoader';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';

interface Transaction {
    timestamp: string;
    amount: number;
    status: 'Success' | 'Failed';
}


interface WalletOverviewData {
    solBalance: number;
    usdBalance: number;
    transactions: Transaction[];
}

const WalletOverview: React.FC = () => {
    const { publicKey } = useWallet();
    const [overview, setOverview] = useState<WalletOverviewData | null>(null);
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = React.useState<number | null>(0);
    const [solanaPrice, setSolanaPrice] = useState<number | null>(null)
    const { connection } = useConnection();


    console.log(overview)
    async function getSolanaPrice(): Promise<number | null> {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd';

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.solana && data.solana.usd) {
                return data.solana.usd;
            } else {
                throw new Error('Invalid data structure');
            }
        } catch (error) {
            console.error('Failed to fetch Solana price:', error);
            return null;
        }
    }

    // Example usage


    useEffect(() => {
        const fetchWalletOverview = async () => {
            if (!publicKey) return;
            setLoading(true);
            try {
                const response = await fetch(`/api/getWalletOverview?publicKey=${publicKey.toString()}`);
                const data: WalletOverviewData = await response.json();
                console.log('Fetched wallet overview data:', data);
                setOverview(data);
            } catch (error) {
                console.error('Error fetching wallet overview:', error);
            } finally {
                setLoading(false);
            }
        };

        getSolanaPrice().then(price => {
            if (price !== null) {
                console.log(`The current price of Solana (SOL) is $${price}`);
                setSolanaPrice(price)
            } else {
                console.log('Could not fetch the price of Solana.');
            }
        });
        fetchWalletOverview();
    }, [publicKey]);

    React.useEffect(function () {
        getSolanaPrice().then(price => {
            if (price !== null) {
                console.log(`The current price of Solana (SOL) is $${price}`);
                setSolanaPrice(price)
            } else {
                console.log('Could not fetch the price of Solana.');
            }
        });
    }, [balance])

    React.useEffect(() => {
        const getInfo = async () => {
            if (connection && publicKey) {
                // we get the account info for the user's wallet data store and set the balance in our application's state
                const info = await connection.getAccountInfo(publicKey);
                setBalance(info!.lamports / web3.LAMPORTS_PER_SOL);
            }
        }
        getInfo();
        // the code above will execute whenever these variables change in any way
    }, [connection, publicKey]);

    if (loading) {
        return <TableLoader />;
    }

    if (!publicKey) {
        return <div>Please connect your wallet to view the overview.</div>;
    }

    if (!overview) {
        return <div>No data available.</div>;
    }

    return (
        <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-4">Wallet Overview</h2>
            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-800 dark:text-gray-200">Total Balance (SOL):</span>
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{balance} SOL</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-lg text-gray-800 dark:text-gray-200">Total Balance (USD):</span>
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">${(balance && solanaPrice) && balance * solanaPrice}</span>
                </div>
            </div>

        </div>
    );
};

export default WalletOverview;
