export async function POST() {
    const res = await fetch('https://api.mainnet-beta.solana.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: 'getBlockHeight',
            params: []
        }),
    })

    const data = await res.json()

    return Response.json(data)
}