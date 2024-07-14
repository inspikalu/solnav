import { NextResponse } from 'next/server';
import { Connection, PublicKey, TransactionResponse } from '@solana/web3.js';

// Define your Solana cluster endpoint
const SOLANA_CLUSTER_URL = 'https://api.mainnet-beta.solana.com';

// Interface for Transaction data
interface Transaction {
    timestamp: string;
    amount: number;
    status: 'Success' | 'Failed';
}

// Interface for API response
interface WalletOverviewResponse {
    solBalance: number;
    usdBalance: number;
    transactions: Transaction[];
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const publicKey = searchParams.get('publicKey');

    if (!publicKey) {
        return NextResponse.json({ error: 'Missing publicKey' }, { status: 400 });
    }

    try {
        const connection = new Connection(SOLANA_CLUSTER_URL);
        const pubKey = new PublicKey(publicKey);

        // Fetch balance
        const lamports = await connection.getBalance(pubKey);
        const SOL_LAMPORTS = 1000000000;
        const solBalance = lamports / SOL_LAMPORTS;

        // Fetch recent transactions (adjust as needed for your specific requirements)
        const confirmedSignatures = await connection.getConfirmedSignaturesForAddress2(pubKey, { limit: 10 });
        const transactions: Transaction[] = await Promise.all(
            confirmedSignatures.map(async (signature) => {
                const tx: TransactionResponse | null = await connection.getTransaction(signature.signature);
                if (tx && tx.blockTime && tx.meta) {
                    return {
                        timestamp: new Date(tx.blockTime * 1000).toLocaleString(),
                        amount: tx.meta.postBalances[0] - tx.meta.preBalances[0],
                        status: tx.meta.err ? 'Failed' : 'Success',
                    };
                } else {
                    // Return a default or empty transaction object if the tx or its properties are null
                    return {
                        timestamp: 'N/A',
                        amount: 0,
                        status: 'Failed',
                    };
                }
            })
        );

        // Fetch SOL to USD price (using a dummy price for example)
        const solToUsdRate = 25; // Fetch this from a reliable source in production

        const response: WalletOverviewResponse = {
            solBalance,
            usdBalance: solBalance * solToUsdRate,
            transactions,
        };

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
