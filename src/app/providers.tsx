"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

export function Providers({ children }: { children: React.ReactNode }) {
    // Получаем базовый URL (работает и локально, и на сервере)
    const baseUrl = typeof window !== "undefined" 
        ? window.location.origin 
        : https://eme-nft.vercel.app;

    return (
        <TonConnectUIProvider manifestUrl={`${baseUrl}/tonconnect-manifest.json`}>
            {children}
        </TonConnectUIProvider>
    );
}
