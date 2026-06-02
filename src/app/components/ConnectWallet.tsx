"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const ConnectWallet = () => {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();

    const handleConnect = async () => {
        // Открываем модалку с выбором кошелька
        tonConnectUI.openModal();
    };

    const handleDisconnect = () => {
        tonConnectUI.disconnect();
    };

    // Если кошелек подключен — показываем адрес
    if (wallet) {
        const shortAddress = `${wallet.account.address.slice(0, 4)}...${wallet.account.address.slice(-4)}`;
        return (
            <button onClick={handleDisconnect} className="connect-btn">
                {shortAddress}
            </button>
        );
    }

    // Если не подключен — показываем кнопку "Подключить"
    return (
        <button onClick={handleConnect} className="connect-btn">
            Connect Wallet
        </button>
    );
};

export default ConnectWallet;