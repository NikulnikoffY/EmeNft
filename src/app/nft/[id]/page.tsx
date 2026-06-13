"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Временные данные (заглушка) — потом заменишь на реальные из бэкенда
const nftData: Record<number, any> = {
    1: {
        id: 1,
        title: "Emerald Core",
        price: 120,
        image: "/1n.png",
        author: "MindForge AI",
        collection: "Emerald Genesis",
        description: "Сердце цифрового кристалла, сияющее изумрудным светом. Первый NFT в коллекции Emerald Genesis.",
        traits: [
            { trait: "Редкость", value: "Легендарная" },
            { trait: "Тип", value: "Кристалл" },
            { trait: "Цвет", value: "Изумрудный" }
        ],
        owner: "0x7a3...c5d2",
        history: [
            { event: "Минт", price: null, from: null, to: "0x7a3...c5d2", date: "2026-06-01" }
        ]
    },
    2: {
        id: 2,
        title: "Аврора: Пробуждение",
        price: 85,
        image: "/2n.png",
        author: "Sergey",
        collection: "Аврора: Сны",
        description: "Первый луч света после долгой тьмы. Аврора открывает глаза на новую эру.",
        traits: [
            { trait: "Редкость", value: "Эпическая" },
            { trait: "Персонаж", value: "Аврора" },
            { trait: "Настроение", value: "Пробуждение" }
        ],
        owner: "0x3b5...7f1a",
        history: [
            { event: "Минт", price: null, from: null, to: "0x3b5...7f1a", date: "2026-06-02" },
            { event: "Продажа", price: 85000, from: "0x3b5...7f1a", to: "0x9c2...4d8e", date: "2026-06-05" }
        ]
    },
    3: {
        id: 3,
        title: "Кристалл памяти",
        price: 200,
        image: "/3n.jpg",
        author: "Sergey",
        collection: "Аврора: Сны",
        description: "Первый луч света после долгой тьмы. Аврора открывает глаза на новую эру.",
        traits: [
            { trait: "Редкость", value: "Эпическая" },
            { trait: "Персонаж", value: "Аврора" },
            { trait: "Настроение", value: "Пробуждение" }
        ],
        owner: "0x3b5...7f1a",
        history: [
            { event: "Минт", price: null, from: null, to: "0x3b5...7f1a", date: "2026-06-02" },
            { event: "Продажа", price: 85000, from: "0x3b5...7f1a", to: "0x9c2...4d8e", date: "2026-06-05" }
        ]
    },
    4: {
        id: 4,
        title: "Цифровой сад",
        price: 45,
        image: "/4n.jpg",
        author: "Sergey",
        collection: "Аврора: Сны",
        description: "Первый луч света после долгой тьмы. Аврора открывает глаза на новую эру.",
        traits: [
            { trait: "Редкость", value: "Эпическая" },
            { trait: "Персонаж", value: "Аврора" },
            { trait: "Настроение", value: "Пробуждение" }
        ],
        owner: "0x3b5...7f1a",
        history: [
            { event: "Минт", price: null, from: null, to: "0x3b5...7f1a", date: "2026-06-02" },
            { event: "Продажа", price: 85000, from: "0x3b5...7f1a", to: "0x9c2...4d8e", date: "2026-06-05" }
        ]
    },
    5: {
        id: 5,
        title: "Машина времени",
        price: 300,
        image: "/5n.jpg",
        author: "Sergey",
        collection: "Аврора: Сны",
        description: "Первый луч света после долгой тьмы. Аврора открывает глаза на новую эру.",
        traits: [
            { trait: "Редкость", value: "Эпическая" },
            { trait: "Персонаж", value: "Аврора" },
            { trait: "Настроение", value: "Пробуждение" }
        ],
        owner: "0x3b5...7f1a",
        history: [
            { event: "Минт", price: null, from: null, to: "0x3b5...7f1a", date: "2026-06-02" },
            { event: "Продажа", price: 85000, from: "0x3b5...7f1a", to: "0x9c2...4d8e", date: "2026-06-05" }
        ]
    },
    6: {
        id: 6,
        title: "Забытый артефакт",
        price: 15,
        image: "/6n.jpg",
        author: "Sergey",
        collection: "Аврора: Сны",
        description: "Первый луч света после долгой тьмы. Аврора открывает глаза на новую эру.",
        traits: [
            { trait: "Редкость", value: "Эпическая" },
            { trait: "Персонаж", value: "Аврора" },
            { trait: "Настроение", value: "Пробуждение" }
        ],
        owner: "0x3b5...7f1a",
        history: [
            { event: "Минт", price: null, from: null, to: "0x3b5...7f1a", date: "2026-06-02" },
            { event: "Продажа", price: 85000, from: "0x3b5...7f1a", to: "0x9c2...4d8e", date: "2026-06-05" }
        ]
    },
    7: {
        id: 7,
        title: "ВеномАрт",
        price: 15,
        image: "/7n.png",
        author: "Sergey",
        collection: "Аврора: Сны",
        description: "Первый луч света после долгой тьмы. Аврора открывает глаза на новую эру.",
        traits: [
            { trait: "Редкость", value: "Эпическая" },
            { trait: "Персонаж", value: "Аврора" },
            { trait: "Настроение", value: "Пробуждение" }
        ],
        owner: "0x3b5...7f1a",
        history: [
            { event: "Минт", price: null, from: null, to: "0x3b5...7f1a", date: "2026-06-02" },
            { event: "Продажа", price: 85000, from: "0x3b5...7f1a", to: "0x9c2...4d8e", date: "2026-06-05" }
        ]
    },
    8: {
        id: 8,
        title: "Стрит",
        price: 15,
        image: "/8n.jpg",
        author: "Sergey",
        collection: "Аврора: Сны",
        description: "Первый луч света после долгой тьмы. Аврора открывает глаза на новую эру.",
        traits: [
            { trait: "Редкость", value: "Эпическая" },
            { trait: "Персонаж", value: "Аврора" },
            { trait: "Настроение", value: "Пробуждение" }
        ],
        owner: "0x3b5...7f1a",
        history: [
            { event: "Минт", price: null, from: null, to: "0x3b5...7f1a", date: "2026-06-02" },
            { event: "Продажа", price: 85000, from: "0x3b5...7f1a", to: "0x9c2...4d8e", date: "2026-06-05" }
        ]
    },
    9: {
        id: 9,
        title: "Утка Даги",
        price: 15,
        image: "/9n.png",
        author: "Sergey",
        collection: "Аврора: Сны",
        description: "Первый луч света после долгой тьмы. Аврора открывает глаза на новую эру.",
        traits: [
            { trait: "Редкость", value: "Эпическая" },
            { trait: "Персонаж", value: "Аврора" },
            { trait: "Настроение", value: "Пробуждение" }
        ],
        owner: "0x3b5...7f1a",
        history: [
            { event: "Минт", price: null, from: null, to: "0x3b5...7f1a", date: "2026-06-02" },
            { event: "Продажа", price: 85000, from: "0x3b5...7f1a", to: "0x9c2...4d8e", date: "2026-06-05" }
        ]
    },
    10: {
        id: 10,
        title: "Мини тигр",
        price: 15,
        image: "/10n.png",
        author: "Sergey",
        collection: "Аврора: Сны",
        description: "Первый луч света после долгой тьмы. Аврора открывает глаза на новую эру.",
        traits: [
            { trait: "Редкость", value: "Эпическая" },
            { trait: "Персонаж", value: "Аврора" },
            { trait: "Настроение", value: "Пробуждение" }
        ],
        owner: "0x3b5...7f1a",
        history: [
            { event: "Минт", price: null, from: null, to: "0x3b5...7f1a", date: "2026-06-02" },
            { event: "Продажа", price: 85000, from: "0x3b5...7f1a", to: "0x9c2...4d8e", date: "2026-06-05" }
        ]
    },
    11: {
        id: 11,
        title: "Колоницация Арт",
        price: 15,
        image: "/12n.jpg",
        author: "Sergey",
        collection: "Аврора: Сны",
        description: "Первый луч света после долгой тьмы. Аврора открывает глаза на новую эру.",
        traits: [
            { trait: "Редкость", value: "Эпическая" },
            { trait: "Персонаж", value: "Аврора" },
            { trait: "Настроение", value: "Пробуждение" }
        ],
        owner: "0x3b5...7f1a",
        history: [
            { event: "Минт", price: null, from: null, to: "0x3b5...7f1a", date: "2026-06-02" },
            { event: "Продажа", price: 85000, from: "0x3b5...7f1a", to: "0x9c2...4d8e", date: "2026-06-05" }
        ]
    },
    12: {
        id: 12,
        title: "Спрут",
        price: 15,
        image: "/11n.jpg",
        author: "Sergey",
        collection: "Аврора: Сны",
        description: "Первый луч света после долгой тьмы. Аврора открывает глаза на новую эру.",
        traits: [
            { trait: "Редкость", value: "Эпическая" },
            { trait: "Персонаж", value: "Аврора" },
            { trait: "Настроение", value: "Пробуждение" }
        ],
        owner: "0x3b5...7f1a",
        history: [
            { event: "Минт", price: null, from: null, to: "0x3b5...7f1a", date: "2026-06-02" },
            { event: "Продажа", price: 85000, from: "0x3b5...7f1a", to: "0x9c2...4d8e", date: "2026-06-05" }
        ]
    }
    // Добавь остальные NFT по мере необходимости
};

export default function NFTDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    const nft = nftData[id];

    const [isBuying, setIsBuying] = useState(false);

    if (!nft) {
        return (
            <div className="nft-not-found">
                <h2>NFT не найден</h2>
                <p>Возможно, он был перемещён или удалён.</p>
                <Link href="/" className="back-home">Вернуться на главную</Link>
            </div>
        );
    }

    const handleBuy = () => {
        setIsBuying(true);
        // Здесь позже будет транзакция через TonConnect
        setTimeout(() => {
            alert("Покупка пока в демо-режиме. Реальная транзакция будет добавлена позже.");
            setIsBuying(false);
        }, 1000);
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString() + " EME";
    };

    return (
        <div className="nft-detail-page">
            <div className="nft-detail-container">
                {/* Кнопка назад */}
                <button onClick={() => router.back()} className="back-button">
                    ← Назад
                </button>

                <div className="nft-detail-grid">
                    {/* Левая колонка — изображение */}
                    <div className="nft-detail-image">
                        <Image src={nft.image} alt={nft.title} width={512} height={512} className="nft-full-image" />
                    </div>

                    {/* Правая колонка — информация */}
                    <div className="nft-detail-info">
                        <h1 className="nft-detail-title">{nft.title}</h1>
                        <p className="nft-detail-collection">
                            <Link href={`/collection/${nft.collection}`}>{nft.collection}</Link>
                        </p>
                        <p className="nft-detail-author">Художник: {nft.author}</p>
                        <p className="nft-detail-description">{nft.description}</p>

                        <div className="nft-detail-price">
                            <span className="price-label">Текущая цена:</span>
                            <span className="price-value">{formatPrice(nft.price)}</span>
                        </div>

                        <button onClick={handleBuy} disabled={isBuying} className="buy-nft-btn">
                            {isBuying ? "Обработка..." : "Купить сейчас"}
                        </button>

                        {/* Характеристики */}
                        <div className="nft-traits">
                            <h3>Характеристики</h3>
                            <div className="traits-grid">
                                {nft.traits.map((trait: any, idx: number) => (
                                    <div key={idx} className="trait-item">
                                        <span className="trait-type">{trait.trait}</span>
                                        <span className="trait-value">{trait.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Информация о владельце */}
                        <div className="nft-owner">
                            <h3>Владелец</h3>
                            <p>{nft.owner}</p>
                        </div>
                    </div>
                </div>

                {/* История продаж */}
                <div className="nft-history">
                    <h3>История продаж</h3>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Событие</th>
                                <th>Цена</th>
                                <th>От</th>
                                <th>Кому</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nft.history.map((event: any, idx: number) => (
                                <tr key={idx}>
                                    <td>{event.event}</td>
                                    <td>{event.price ? formatPrice(event.price) : "—"}</td>
                                    <td>{event.from || "—"}</td>
                                    <td>{event.to || "—"}</td>
                                    <td>{event.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}