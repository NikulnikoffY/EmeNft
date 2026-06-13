"use client";

import Carousel from "./components/Carousel";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// 1. Сначала объявляем данные
const mockNFTs = [
    { id: 1, title: "Emerald Core", price: 120, image: "/1n.png", author: "MindForge AI" },
    { id: 2, title: "Аврора: Пробуждение", price: 85, image: "/2n.png", author: "Sergey" },
    { id: 3, title: "Кристалл памяти", price: 200, image: "/3n.jpg", author: "Феня" },
    { id: 4, title: "Цифровой сад", price: 45, image: "/4n.jpg", author: "AI Generator" },
    { id: 5, title: "Машина времени", price: 300, image: "/5n.jpg", author: "Аврора" },
    { id: 6, title: "Забытый артефакт", price: 15, image: "/6n.jpg", author: "MindForge DAO" },
    { id: 7, title: "ВеномАрт", price: 15, image: "/7n.png", author: "MindForge DAO" },
    { id: 8, title: "Стрит", price: 15, image: "/8n.jpg", author: "MindForge DAO" },
    { id: 9, title: "Утка Даги", price: 15, image: "/9n.png", author: "MindForge DAO" },
    { id: 10, title: "Мини тигр", price: 15, image: "/10n.png", author: "MindForge DAO" },
    { id: 11, title: "Колонизация Арт", price: 15, image: "/12n.jpg", author: "MindForge DAO" },
    { id: 12, title: "Спрут", price: 15, image: "/11n.jpg", author: "MindForge DAO" },
];

// 2. Потом компонент
export default function Home() {
    const [filter, setFilter] = useState("all");

    return (
        <main>
            <div className="gallery-neon">
                <div className="gallery-bg-layer"></div>
                <div className="gallery-grid-layer"></div>

                <div className="gallery-container">
                    <h2 className="gallery-title">Галерея Emerald</h2>
                    <p className="gallery-subtitle">
                        Уникальные NFT, созданные AI и художниками MindForge. Каждый токен — часть нашей вселенной.
                    </p>

                    {/* 3. Карусель — передаём items! */}
                    <Carousel items={mockNFTs} baseSpeed={30} speedMultiplier={5} />

                    <div className="gallery-filters">
                        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Все</button>
                        <button className={filter === "popular" ? "active" : ""} onClick={() => setFilter("popular")}>Популярные</button>
                        <button className={filter === "new" ? "active" : ""} onClick={() => setFilter("new")}>Новые</button>
                    </div>

                    <div className="gallery-grid">
                        {mockNFTs.map((nft) => (
                             <Link href={`/nft/${nft.id}`} key={nft.id}>
                            <div key={nft.id} className="nft-card-neon">
                                <div className="nft-image-wrapper">
                                    <Image src={nft.image} alt={nft.title} width={300} height={300} className="nft-image" />
                                </div>
                                <div className="nft-info">
                                    <h3 className="nft-title">{nft.title}</h3>
                                    <p className="nft-author">{nft.author}</p>
                                    <div className="nft-price">{nft.price} EME</div>
                                    <button className="buy-btn-neon">Купить</button>
                                </div>
                            </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}