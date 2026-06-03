"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import Link from "next/link";

const ConnectWallet = () => {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();

    const handleConnect = () => {
        tonConnectUI.openModal();
    };

    const handleDisconnect = () => {
        tonConnectUI.disconnect();
    };

    // Кошелёк подключён → показываем ссылку на профиль
    if (wallet) {
        const shortAddress = `${wallet.account.address.slice(0, 6)}...${wallet.account.address.slice(-4)}`;
        return (
            <Link 
                href={`/profile/${wallet.account.address}`}
                className="connect-btn profile-link"
            >
                {shortAddress}
            </Link>
        );
    }

    // Кошелёк не подключён → показываем кнопку
    return (
        <button onClick={handleConnect} className="connect-btn">
            Connect Wallet
        </button>
    );
};

export default ConnectWallet;