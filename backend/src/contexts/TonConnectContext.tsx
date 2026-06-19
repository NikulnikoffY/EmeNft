import React, { createContext, useContext, useState, useEffect } from 'react';
import { TonConnectUIProvider, useTonConnectUI } from '@tonconnect/ui-react';

interface TonConnectContextType {
  isConnected: boolean;
  walletAddress: string | null;
  balance: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const TonConnectContext = createContext<TonConnectContextType | undefined>(undefined);

export const useTonConnect = () => {
  const context = useContext(TonConnectContext);
  if (!context) {
    throw new Error('useTonConnect must be used within TonConnectProvider');
  }
  return context;
};

interface TonConnectProviderProps {
  children: React.ReactNode;
}

// Internal component that uses TonConnectUI hooks
const TonConnectContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tonConnectUI] = useTonConnectUI();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    // Update connection state when TonConnectUI state changes
    if (tonConnectUI) {
      setIsConnected(tonConnectUI.connected);
      if (tonConnectUI.account) {
        setWalletAddress(tonConnectUI.account.address);
      } else {
        setWalletAddress(null);
      }
    }
  }, [tonConnectUI?.connected, tonConnectUI?.account]);

  const connect = async () => {
    try {
      await tonConnectUI?.openModal();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = async () => {
    try {
      await tonConnectUI?.disconnect();
      setIsConnected(false);
      setWalletAddress(null);
      setBalance(null);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  const value: TonConnectContextType = {
    isConnected,
    walletAddress,
    balance,
    connect,
    disconnect
  };

  return (
    <TonConnectContext.Provider value={value}>
      {children}
    </TonConnectContext.Provider>
  );
};

export const TonConnectProvider: React.FC<TonConnectProviderProps> = ({ children }) => {
  // Use ngrok URL for external access, fallback to localhost for development
  const manifestUrl = typeof window !== 'undefined' 
    ? window.location.hostname.includes('ngrok') 
      ? `${window.location.origin}/tonconnect-manifest.json`
      : '/tonconnect-manifest.json'
    : '/tonconnect-manifest.json';

  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        twaReturnUrl: 'https://unrespited-yaritza-aphoristically.ngrok-free.dev',
        returnStrategy: 'back',
        skipRedirectToWallet: 'ios'
      }}
      uiPreferences={{
        theme: 'DARK' as any,
        borderRadius: 's' as any
      }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: 'tonwallet',
            name: 'TON Wallet',
            imageUrl: 'https://wallet.ton.org/assets/ui/qr-logo.png',
            aboutUrl: 'https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd',
            universalLink: 'https://wallet.ton.org/ton-connect',
            jsBridgeKey: 'tonwallet',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['chrome', 'android']
          },
          {
            appName: 'mytonwallet',
            name: 'MyTonWallet',
            imageUrl: 'https://mytonwallet.io/static/img/logo.svg',
            aboutUrl: 'https://chrome.google.com/webstore/detail/mytonwallet/fldfpeidohhgccehjpibkghmpbhfkhha',
            universalLink: 'https://app.mytonwallet.io',
            jsBridgeKey: 'mytonwallet',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['chrome', 'android']
          },
          {
            appName: 'tonkeeper',
            name: 'Tonkeeper',
            imageUrl: 'https://tonkeeper.com/assets/tonconnect-icon.png',
            aboutUrl: 'https://chrome.google.com/webstore/detail/tonkeeper/fldfpeidohhgccehjpibkghmpbhfkhha',
            universalLink: 'https://app.tonkeeper.com',
            jsBridgeKey: 'tonkeeper',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['chrome', 'android', 'ios']
          }
        ]
      }}
    >
      <TonConnectContextProvider>
        {children}
      </TonConnectContextProvider>
    </TonConnectUIProvider>
  );
};
