import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const res = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: "getRecentPerformanceSamples",
        params: [60]
      }),
    });

    const response = await res.json();
    const samples: any[] = response.result;

    if (samples.length === 0) {
      return NextResponse.json({ error: "No performance samples available." });
    }

    let totalTransactions = 0;
    let totalTime = 0;

    samples.forEach(sample => {
      totalTransactions += sample.numTransactions;
      totalTime += sample.samplePeriodSecs;
    });

    const tps = totalTransactions / totalTime;
    return NextResponse.json({ tps: tps.toFixed(3) });
  } catch (error) {
    console.error("Error fetching performance samples:", error);
    return NextResponse.json({ error: "Error fetching performance samples." });
  }
}
