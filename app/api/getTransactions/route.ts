import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, ParsedConfirmedTransaction } from '@solana/web3.js';

const SOLANA_RPC_ENDPOINT = 'https://api.devnet.solana.com'; // Change to mainnet-beta for mainnet

interface TransactionDetail {
    timestamp: string;
    amount: number;
    status: string;
}

const getTransactions = async (publicKey: string): Promise<TransactionDetail[]> => {
    const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');
    const publicKeyObj = new PublicKey(publicKey);
    const signatures = await connection.getConfirmedSignaturesForAddress2(publicKeyObj);

    const transactions: TransactionDetail[] = [];
    for (const signatureInfo of signatures) {
        const tx = await connection.getParsedConfirmedTransaction(signatureInfo.signature);
        if (tx) {
            transactions.push({
                timestamp: tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleString() : 'N/A',
                amount: (tx.meta?.postBalances[0] || 0) - (tx.meta?.preBalances[0] || 0),
                status: tx.meta?.err ? 'Failed' : 'Success',
            });
        }
    }
    return transactions;
};

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const publicKey = searchParams.get('publicKey');

    if (!publicKey) {
        return NextResponse.json({ error: 'Public key is required' }, { status: 400 });
    }

    try {
        const transactions = await getTransactions(publicKey);
        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching transactions' }, { status: 500 });
    }
}
