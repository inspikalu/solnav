# SolNav

## Description

SolNav is a Next.js 14 application designed to provide a comprehensive overview of the Solana blockchain network. The application displays key metrics and analytics, including block height, average block time, transactions per second (TPS), token analytics, transaction tables, and wallet overviews. This application is built using TypeScript and is managed with pnpm.

## Features

- **Network Overview**: Displays essential metrics such as block height, average block time, and TPS.
- **Block Height**: Shows the current block height of the Solana blockchain.
- **Average Block Time**: Provides the average time taken to produce a block on the Solana network.
- **Transactions per Second (TPS)**: Displays the current TPS on the Solana network.
- **Token Analytics**: Offers detailed analytics for various tokens on the Solana blockchain.
- **Transactions Table**: Lists recent transactions on the network.
- **Wallet Overview**: Provides an overview of connected wallets.

## Prerequisites

- Node.js (v16.x or higher)
- pnpm (v7.x or higher)

## Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/inspikalu/solnav.git
   cd solnav
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

### Development

To start the development server, run:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Building

To build the application for production, run:

```bash
pnpm build
```

This will create an optimized production build in the `.next` directory.

### Production

To start the application in production mode, run:

```bash
pnpm start
```

### Testing

To run the tests, use:

```bash
pnpm test
```

### Linting

To lint the codebase, run:

```bash
pnpm lint
```

## Additional Scripts

- **`pnpm format`**: Format the code using Prettier.