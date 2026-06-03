"use client";

import { useParams } from "next/navigation";
import { useTonWallet } from "@tonconnect/ui-react";
import Image from "next/image";
import Link from "next/link";

export default function UserProfilePage() {
    const params = useParams();
    const wallet = useTonWallet();
    const addressFromUrl = params.address as string;

    const isOwnProfile = wallet?.account.address === addressFromUrl;
    const shortAddress = `${addressFromUrl.slice(0, 6)}...${addressFromUrl.slice(-4)}`;

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <Image
                            src="/screen.png"
                            width={100}
                            height={100}
                            alt="User avatar"
                            className="avatar-image"
                        />
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-address">{shortAddress}</h1>
                        {isOwnProfile && <span className="profile-badge">Это вы</span>}
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
                <div className="profile-nft-section">
                    <h2>Коллекция NFT</h2>
                    <div className="nft-grid-placeholder">
                        <p>Скоро здесь появятся ваши NFT</p>
                    </div>
                </div>
                <Link href="/" className="back-home-btn">← На главную</Link>
            </div>
        </div>
    );
}