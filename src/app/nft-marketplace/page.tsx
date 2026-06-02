import Image from "next/image";
import Link from "next/link";

export default function NFTMarketplacePage() {
    return (
        <div className="page-under-construction">
            <div className="construction-overlay">
                <div className="construction-content">
                    <Image
                        src="/3dlogo.svg"
                        width={120}
                        height={120}
                        alt="Emerald logo"
                    />
                    <h1>NFT Маркетплейс</h1>
                    <p>Раздел находится в активной разработке</p>
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                    <p className="progress-text">Мы уже работаем над этим</p>
                    <Link href="/" className="back-home">Вернуться на главную</Link>
                </div>
            </div>
        </div>
    );
}