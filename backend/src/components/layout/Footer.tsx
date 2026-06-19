import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">TON NFT Marketplace</h3>
            <p className="text-gray-400 mb-4">
              Create, mint, and trade NFTs on the TON blockchain with seamless GetGems integration.
            </p>
            <p className="text-sm text-gray-500">
              Built with TON blockchain technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/mint" className="text-gray-400 hover:text-white transition-colors">
                  Mint NFT
                </a>
              </li>
              <li>
                <a href="/collection" className="text-gray-400 hover:text-white transition-colors">
                  View Collections
                </a>
              </li>
              <li>
                <a href="/list" className="text-gray-400 hover:text-white transition-colors">
                  List NFT
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://docs.ton.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  TON Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://getgems.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GetGems Marketplace
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/ton-connect/sdk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  TON Connect SDK
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 TON NFT Marketplace. Built with TON blockchain.
          </p>
        </div>
      </div>
    </footer>
  );
};
