import type { Metadata } from "next";
import { Providers } from "./providers";
import { TheHeader } from "./components/TheHeader";
import "./globals.css";

export const metadata: Metadata = {
    title: "MindForge | Emerald (EME)",
    description: "NFT маркетплейс на TON с AI-генерацией. Токен Emerald (EME). Пресейл на Pinksale.",
    keywords: "NFT, TON, Emerald, EME, MindForge, маркетплейс, пресейл",
    authors: [{ name: "MindForge" }],
    viewport: "width=device-width, initial-scale=1",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body>
                <Providers>
                    <TheHeader />
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    );
}