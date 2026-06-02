"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTonWallet } from "@tonconnect/ui-react";
import "./header.css";

export default function UserProfilePage() {
    const params = useParams();
    const wallet = useTonWallet();

    // Получаем адрес из URL (то, что в [address])
    const addressFromUrl = params.address as string;

    // Если адрес в URL не совпадает с подключенным кошельком — показываем предупреждение
    const isOwnProfile = wallet?.account.address === addressFromUrl;

    // Сокращаем адрес для красивого отображения
    const shortAddress = `${addressFromUrl.slice(0, 6)}...${addressFromUrl.slice(-4)}`;

    return (
        <div className="profile-page">
            <div className="profile-container">
                {/* Шапка профиля */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        <Image
                            src="/avatar-placeholder.png"
                            width={120}
                            height={120}
                            alt="User avatar"
                            className="avatar-image"
                        />
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-address">{shortAddress}</h1>
                        {isOwnProfile && (
                            <span className="profile-badge">Это вы</span>
                        )}
                        <div className="profile-stats">
                            <div className="stat">
                                <span className="stat-value">0</span>
                                <span className="stat-label">NFT</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">0</span>
                                <span className="stat-label">EME</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Секция с NFT (заглушка) */}
                <div className="profile-nft-section">
                    <h2>Коллекция NFT</h2>
                    <div className="nft-grid placeholder">
                        <div className="nft-card-placeholder">
                            <div className="nft-image-placeholder"></div>
                            <p>Скоро здесь появятся ваши NFT</p>
                        </div>
                    </div>
                    <p className="nft-note">
                        Маркетплейс в разработке. Следите за новостями.
                    </p>
                </div>

                {/* Кнопка назад */}
                <Link href="/" className="back-home-btn">
                    ← На главную
                </Link>
            </div>
        </div>
    );
}