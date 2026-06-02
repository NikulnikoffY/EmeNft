
import Image from "next/image";
import Link from "next/link";
import "./token.css";

const TokenBlock = () => {
    return (
        <>
            {/* ========== ПЕРВЫЙ ЭКРАН: МОНЕТА + ТЕКСТ ========== */}
            <section className="token-block">
                <div className="token-container">
                    {/* Левая колонка — монета */}
                    <div className="token-coin">
                        <Image
                            src="/3dlogo.svg"   // твой файл лого
                            width={350}
                            height={350}
                            alt="Emerald EME coin"
                            className="coin-image"
                        />
                    </div>

                    {/* Правая колонка — текст */}
                    <div className="token-info">
                        <h2 className="token-title">Emerald (EME)</h2>
                        <p className="token-description">
                            Emerald — внутренний токен маркетплейса NFT в сети TON.
                        </p>
                        <ul className="token-list">
                            <li>🔹 Покупка NFT-артов за EME</li>
                            <li>🔹 Стейкинг и управление (в будущем)</li>
                            <li>🔹 Комиссия маркетплейса — всего 1%</li>
                            <li>🔹 Токен с реальной утилитой, а не мем</li>
                        </ul>
                        <p className="token-note">
                            Пресейл на Pinksale. Пул ликвидности — сначала Dedust, затем STON.fi.
                        </p>
                    </div>
                </div>
            </section>

            {/* ========== ВТОРОЙ ЭКРАН: ТОКЕНОМИКА И ПРЕСЕЙЛ ========== */}
            <section className="tokenomics">
                <div className="tokenomics-container">
                    {/* Левый блок — цифры и пресейл */}
                    <div className="tokenomics-info">
                        <h2 className="tokenomics-title">Токеномика Emerald</h2>
                        <p className="tokenomics-subtitle">
                            100 млрд EME • 20 лет эмиссии • пресейл в USDT
                        </p>

                        <div className="presale-card">
                            <h3>Пресейл</h3>
                            <div className="presale-details">
                                <div><span>Цена:</span> 1 USDT = 20 000 EME</div>
                                <div><span>Хардкап:</span> 150 000 USDT</div>
                                <div><span>Софткап:</span> 25 000 USDT</div>
                                <div><span>Мин. покупка:</span> 50 USDT</div>
                                <div><span>Вестинг:</span> 20% сразу, 80% по 10%/мес</div>
                            </div>
                        </div>

                        <div className="supply-card">
                            <h3>Распределение Genesis (20 млрд EME)</h3>
                            <ul className="supply-list">
                                <li><span>Пресейл</span> 15% (3 млрд)</li>
                                <li><span>Ликвидность</span> 20% (4 млрд)</li>
                                <li><span>Команда (вестинг)</span> 10% (2 млрд)</li>
                                <li><span>Маркетинг / Резерв</span> 15% (3 млрд)</li>
                                <li><span>Стейкинг-пул</span> 10% (2 млрд)</li>
                                <li><span>Airdrop</span> 5% (1 млрд)</li>
                                <li><span>Долгосрочная эмиссия</span> 25% (5 млрд)</li>
                            </ul>
                        </div>
                    </div>

                    {/* Правый блок — диаграмма с легендой */}
                    <div className="tokenomics-chart">
                        <div className="chart-wrapper">
                            <div className="chart-placeholder"></div>
                            <div className="chart-legend">
                                <div className="legend-item">
                                    <div className="legend-color presale"></div>
                                    <span>Пресейл — 15%</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color liquidity"></div>
                                    <span>Ликвидность — 20%</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color team"></div>
                                    <span>Команда — 10%</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color marketing"></div>
                                    <span>Маркетинг — 15%</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color staking"></div>
                                    <span>Стейкинг — 10%</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color airdrop"></div>
                                    <span>Airdrop — 5%</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color emission"></div>
                                    <span>Эмиссия — 25%</span>
                                </div>
                            </div>
                        </div>
                        <p className="chart-note">
                            Жёсткий хардкап: 100 млрд EME<br />
                            Эмиссия: 4 млрд/год → 20 лет → остановка
                        </p>
                    </div>
                </div>
            </section>

            {/* ========== ТРЕТИЙ ЭКРАН: ROADMAP ТИЗЕР ========== */}
            <section className="roadmap-teaser">
                <div className="roadmap-teaser-container">
                    {/* Левая колонка — арт */}
                    <div className="roadmap-teaser-image">
                        <Image
                            src="/imroad.svg"   // заменишь на свой пиксельный арт
                            width={280}
                            height={280}
                            alt="Roadmap preview"
                            className="teaser-art"
                        />
                    </div>

                    {/* Правая колонка — текст + ссылка */}
                    <div className="roadmap-teaser-info">
                        <h2 className="roadmap-teaser-title">Дорожная карта</h2>
                        <p className="roadmap-teaser-text">
                            У нас нет обещаний «через год сделаем рай на земле».  
                            Есть чёткий план: маркетплейс, стейкинг, игра «Колыбель человечества».  
                            Без магии. Только код, арты и поэтапное развитие.
                        </p>
                        <ul className="roadmap-teaser-list">
                            <li>✅ Запуск пресейла (Pinksale)</li>
                            <li>🔵 Ликвидность на Dedust → STON.fi</li>
                            <li>⭕ NFT маркетплейс (генеративные коллекции)</li>
                            <li>⭕ Стейкинг NFT с ежедневными выплатами</li>
                            <li>⭕ Игра «Колыбель человечества» (демо)</li>
                        </ul>
                        <Link href="/roadmap" className="roadmap-full-link">
                            Подробная дорожная карта →
                        </Link>
                        <p className="roadmap-teaser-note">
                            Полная версия со сроками, вехами и целями на отдельной странице.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TokenBlock;