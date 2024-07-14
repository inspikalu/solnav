import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import TableLoader from '@/app/components/TableLoader';

function lamportsToSol(lamports: number) {
    const SOL_LAMPORTS = 1000000000; // 1 SOL = 1,000,000,000 lamports
    return lamports / SOL_LAMPORTS;
}

const TransactionsTable: React.FC = () => {
    const { publicKey } = useWallet();
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!publicKey) return;
            setLoading(true);
            try {
                const response = await fetch(`/api/getTransactions?publicKey=${publicKey.toString()}`);
                const data = await response.json();

                // Ensure data is an array
                if (Array.isArray(data)) {
                    setTransactions(data);
                } else {
                    setTransactions([]);
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [publicKey]);

    return (
        <div>
            <WalletMultiButton />
            {loading ? (
                <TableLoader />
            ) : (
                <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden my-3">
                    <thead>
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-800 dark:text-gray-400">Timestamp</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-800 dark:text-gray-400">Amount (sol)</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-800 dark:text-gray-400">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}`}>
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-300">{tx.timestamp}</td>
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-300">{lamportsToSol(tx.amount).toFixed(2)} sol</td>
                                <td className={`py-3 px-4 ${tx.status === 'Success' ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{tx.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionsTable;
