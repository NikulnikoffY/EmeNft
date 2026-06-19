import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from '../../contexts/TonConnectContext';

export const WalletConnect: React.FC = () => {
  const { isConnected, walletAddress } = useTonConnect();

  return (
    <div className="flex items-center space-x-4">
      {isConnected && walletAddress ? (
        <div className="flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-lg">
          <span className="text-sm font-medium text-gray-700">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}
          </span>
          <TonConnectButton />
        </div>
      ) : (
        <TonConnectButton />
      )}
    </div>
  );
};
