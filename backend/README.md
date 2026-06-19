# TON NFT Marketplace with GetGems Integration

A comprehensive TON NFT minting and marketplace application that integrates with GetGems marketplace for listing and selling NFTs.

## Features

- **NFT Collection Creation**: Deploy NFT collections on TON blockchain
- **NFT Minting**: Mint individual NFTs within collections
- **GetGems Integration**: List NFTs for sale on GetGems marketplace
- **Modern Web UI**: Beautiful, responsive interface for all operations
- **Wallet Integration**: TON Connect 2.0 wallet connection
- **IPFS Storage**: Automatic metadata and image upload to IPFS
- **API Endpoints**: RESTful API for programmatic access
- **Command Line Tools**: Standalone scripts for automation

## Quick Start

### Prerequisites

- Node.js 16+ 
- TON wallet with testnet TON (get from @testgiver_ton_bot)
- Pinata account for IPFS storage
- TON Center API key (get from @tonapibot)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ton-nft-mint
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
MNEMONIC=your_24_word_seed_phrase_here
TONCENTER_API_KEY=your_toncenter_api_key_here
TESTNET=true
PINATA_API_KEY=your_pinata_api_key
PINATA_API_SECRET=your_pinata_secret
PORT=3000
```

### Running the Application

#### Web Interface
```bash
npm run serve
```
Visit `http://localhost:3000` to access the web interface.

#### Command Line Scripts
```bash
# Deploy collection and mint NFTs
npm start

# List NFT for sale
npm run list
```

## Usage

### Web Interface

1. **Connect Wallet**: Click "Connect Wallet" to connect your TON wallet
2. **Mint Collection**: 
   - Go to Mint page
   - Fill collection details
   - Upload images
   - Deploy collection
   - Mint NFTs
3. **List NFT**: 
   - Go to List NFT page
   - Enter collection address and NFT index
   - Set sale price and fees
   - Create sale contract
   - Transfer NFT to marketplace
4. **View Collection**: Browse your collections and NFTs

### API Endpoints

#### Collection Management
- `POST /nft/address` - Get collection address
- `POST /nft/state-init` - Get collection state init
- `POST /nft/deploy` - Deploy collection
- `POST /nft/top-up` - Top up collection balance

#### NFT Operations
- `POST /nft/item/address` - Get NFT item address by index
- `POST /nft/sale/create` - Create sale contract
- `POST /nft/sale/transfer` - Transfer NFT to sale contract

#### Marketplace
- `GET /nft/marketplace/address` - Get marketplace address

### Command Line Usage

#### List NFT Script
```bash
# Set environment variables
export NFT_INDEX=0
export SALE_PRICE=10
export MARKETPLACE_FEE=1
export ROYALTY_AMOUNT=0.5

# Run listing script
npm run list
```

## Architecture

### Smart Contracts

- **NftCollection**: Collection contract for managing NFT collections
- **NftSale**: Sale contract for GetGems marketplace integration
- **NftItem**: Individual NFT item operations
- **NftMarketplace**: Marketplace address management

### Frontend

- **Modern UI**: Responsive design with CSS Grid and Flexbox
- **TON Connect**: Wallet integration using TON Connect 2.0
- **API Client**: RESTful API communication
- **File Upload**: Drag & drop image upload with IPFS integration

### Backend

- **Express Server**: RESTful API endpoints
- **CORS Support**: Cross-origin resource sharing
- **Static File Serving**: Frontend asset serving
- **Error Handling**: Comprehensive error management

## GetGems Integration

The application integrates with GetGems marketplace through:

1. **Sale Contract Deployment**: Creates GetGems-compatible sale contracts
2. **NFT Transfer**: Transfers NFT ownership to sale contract
3. **Marketplace URLs**: Generates GetGems viewing links
4. **Fee Management**: Handles marketplace and royalty fees

### Marketplace Addresses

- **Testnet**: `EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N`
- **Mainnet**: `EQBYTuYbLf8INxFtD8tQeNk5ZLy-nAX9ahQbG_yl1qQ-GEMS`

## File Structure

```
src/
├── contracts/
│   ├── NftCollection.ts    # Collection contract
│   ├── NftSale.ts          # Sale contract
│   ├── NftItem.ts          # NFT item operations
│   └── NftMarketplace.ts   # Marketplace helper
├── app.ts                  # Main minting script
├── listNft.ts             # Listing script
├── server.ts              # Express server
├── utils.ts               # Utility functions
└── metadata.ts            # IPFS operations

public/
├── index.html             # Landing page
├── pages/
│   ├── mint.html         # Minting interface
│   ├── collection.html   # Collection viewer
│   └── list.html         # Listing interface
├── css/
│   └── styles.css        # Styling
└── js/
    ├── app.js            # Main frontend logic
    ├── api.js            # API client
    └── ton-connect.js    # Wallet integration
```

## Configuration

### Environment Variables

- `MNEMONIC`: 24-word seed phrase for wallet
- `TONCENTER_API_KEY`: API key for TON Center
- `TESTNET`: Use testnet (true/false)
- `PINATA_API_KEY`: Pinata API key for IPFS
- `PINATA_API_SECRET`: Pinata API secret
- `PORT`: Server port (default: 3000)

### Script Variables (for listNft.ts)

- `NFT_INDEX`: Index of NFT to list
- `SALE_PRICE`: Sale price in TON
- `MARKETPLACE_FEE`: Marketplace fee in TON
- `ROYALTY_AMOUNT`: Royalty amount in TON

## Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Testing

The application includes comprehensive error handling and validation. Test with:

1. Testnet TON (get from @testgiver_ton_bot)
2. Testnet GetGems (https://testnet.getgems.io)
3. Testnet TON Center API

## Troubleshooting

### Common Issues

1. **Wallet Connection Failed**: Ensure TON Connect is properly initialized
2. **Transaction Failed**: Check wallet balance and network status
3. **IPFS Upload Failed**: Verify Pinata credentials
4. **API Errors**: Check server logs and network connectivity

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=true
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License - see LICENSE file for details.

## Support

For issues and questions:
- Create an issue on GitHub
- Join TON developer community
- Check TON documentation

## References

- [TON NFT Minting Guide](https://docs.ton.org/v3/guidelines/dapps/tutorials/nft-minting-guide)
- [GetGems NFT Contracts](https://github.com/getgems-io/nft-contracts)
- [TON Connect Documentation](https://docs.ton.org/develop/dapps/ton-connect/overview)
- [TON Center API](https://toncenter.com/api/v2/)
