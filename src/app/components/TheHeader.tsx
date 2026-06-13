"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ConnectWallet from "./ConnectWallet";
import "./header.css";

const TheHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header>
            <div className="hede">
                {/* Логотип */}
                <div className="logo">
                    <Link href="/" onClick={closeMenu}>
                        <Image
                            src="/logo.svg"
                            width={48}
                            height={48}
                            alt="Emerald logo"
                        />
                    </Link>
                </div>

                {/* Бургер-кнопка (только на мобилках) */}
                <button 
                    className={`burger-btn ${isMenuOpen ? "open" : ""}`} 
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Навигация (десктоп — всегда видна, мобилка — через бургер) */}
                <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                    <Link href="/" onClick={closeMenu}>Gallery</Link>
                    <Link href="/token" onClick={closeMenu}>Token</Link>
                    <Link href="/roadmap" onClick={closeMenu}>Roadmap</Link>
                    <div className="mobile-connect">
                        <ConnectWallet />
                    </div>
                </nav>

                {/* Кнопка Connect для десктопа */}
                <div className="desktop-connect">
                    <ConnectWallet />
                </div>
            </div>
        </header>
    );
};

export { TheHeader };