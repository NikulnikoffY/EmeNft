import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletConnect } from '../wallet/WalletConnect';
import { FaGem } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaGem className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-gray-900">TON NFT</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/mint"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/mint') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Mint
            </Link>
            <Link
              to="/collection"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/collection') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Collection
            </Link>
            <Link
              to="/list"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/list') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              List NFT
            </Link>
          </div>

          {/* Wallet Connect */}
          <WalletConnect />
        </div>
      </div>
    </nav>
  );
};
