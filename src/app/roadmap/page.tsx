"use client";

import Link from "next/link";


export default function RoadmapPage() {
    return (
        <div className="roadmap-page">
            <div className="roadmap-container">
                <h1 className="roadmap-title">Дорожная карта Emerald</h1>
                <p className="roadmap-subtitle">
                    План развития MindForge • 2026–2027
                </p>

                {/* ========== ОСНОВНАЯ КАРТА ========== */}
                <div className="roadmap-grid">
                    <div className="roadmap-card">
                        <div className="roadmap-phase">Q3 2026</div>
                        <h3>Запуск и становление</h3>
                        <ul>
                            <li>✅ Фронтенд маркетплейса (галерея, карусель)</li>
                            <li>✅ Подключение TON кошелька (TonConnect)</li>
                            <li>✅ Смарт-контракт токена EME (Jetton)</li>
                            <li>🔄 Аудит смарт-контрактов (базовый)</li>
                            <li>🔴 Пресейл на Pinksale</li>
                            <li>🟡 Ликвидность на Dedust → STON.fi</li>
                            <li>🔄 Админ-панель (модерация NFT)</li>
                        </ul>
                    </div>

                    <div className="roadmap-card">
                        <div className="roadmap-phase">Q4 2026</div>
                        <h3>Маркетплейс</h3>
                        <ul>
                            <li>🟡 Публичная beta маркетплейса</li>
                            <li>🟡 Интеграция с Fragment (Telegram-номера/ники)</li>
                            <li>🟡 Первые 10 коллекций художников</li>
                            <li>🟡 Система реферальных комиссий</li>
                            <li>🟡 Запуск NFT 2.0 (TEP-62/64/66)</li>
                        </ul>
                    </div>

                    <div className="roadmap-card">
                        <div className="roadmap-phase">Q1 2027</div>
                        <h3>Экосистема</h3>
                        <ul>
                            <li>🟡 AI-генератор изображений (оплата в EME)</li>
                            <li>🟡 Стейкинг NFT (ежедневные выплаты)</li>
                            <li>🟡 DAO-управление (голосование за комиссии)</li>
                            <li>🟡 Английская версия сайта</li>
                            <li>🟡 Маркетинговый рывок (Twitter, Telegram, TON-чаты)</li>
                        </ul>
                    </div>

                    <div className="roadmap-card">
                        <div className="roadmap-phase">Q2–Q3 2027</div>
                        <h3>Игра «Колыбель человечества»</h3>
                        <ul>
                            <li>🟡 Демо-версия игры (Godot)</li>
                            <li>🟡 Внутриигровые предметы как NFT</li>
                            <li>🟡 Интеграция с маркетплейсом (покупка за EME)</li>
                            <li>🟡 Закрытый бета-тест</li>
                        </ul>
                    </div>
                </div>

                {/* ========== БЛИЖАЙШИЕ ПЛЮШКИ ========== */}
                <div className="features-section">
                    <h2>🔮 Что нас ждёт (ближайшие плюшки)</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>💎 Стейкинг NFT</h3>
                            <p>Пассивный доход в EME за владение NFT. Держатели получают ежедневные выплаты.</p>
                        </div>
                        <div className="feature-card">
                            <h3>🎨 AI-генератор изображений</h3>
                            <p>Создавай уникальные NFT за EME. Художники — не нужны, оплата токеном.</p>
                        </div>
                        <div className="feature-card">
                            <h3>🤖 Игра «Колыбель человечества»</h3>
                            <p>Внутриигровые предметы как NFT. Покупка, продажа, использование в игре.</p>
                        </div>
                        <div className="feature-card">
                            <h3>🗳️ DAO-управление</h3>
                            <p>Инвесторы голосуют за комиссии, развитие и новые функции.</p>
                        </div>
                        <div className="feature-card">
                            <h3>👥 Реферальная программа</h3>
                            <p>Получай % от покупок приведённых друзей.</p>
                        </div>
                        <div className="feature-card">
                            <h3>🌐 Английская версия сайта</h3>
                            <p>Выход на глобальный рынок, привлечение западных инвесторов.</p>
                        </div>
                    </div>
                </div>

                {/* ========== ВЫГОДА ИНВЕСТОРА ========== */}
                <div className="benefits-section">
                    <h2>💎 Выгода для инвестора и пользователя</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <h3>📈 Для инвестора</h3>
                            <p>Вход по самой низкой цене, доход от стейкинга, управление через DAO, участие в развитии экосистемы.</p>
                        </div>
                        <div className="benefit-card">
                            <h3>🎮 Для пользователя</h3>
                            <p>Уникальный маркетплейс с AI, игра, реферальные бонусы, полезные NFT (а не просто картинки).</p>
                        </div>
                        <div className="benefit-card">
                            <h3>🎨 Для художника</h3>
                            <p>Инструменты для создания NFT, оплата в EME, готовая аудитория и продвижение.</p>
                        </div>
                        <div className="benefit-card">
                            <h3>💎 Для держателя EME</h3>
                            <p>Токен с реальной утилитой (не мем), дефляция, ликвидность, стейкинг.</p>
                        </div>
                    </div>
                </div>

                {/* ========== ЧЕСТНОЕ ПРЕДУПРЕЖДЕНИЕ ========== */}
                <div className="warning-section">
                    <h2>⚠️ А что, если не соберём софткап?</h2>
                    <p>
                        Мы честны с вами. Если пресейл не наберёт минимальную сумму (25 000 USDT), мы <strong>не исчезнем</strong>.
                        Мы разберём ошибки, доработаем продукт и запустим пресейл снова. И будем повторять, пока не получится.
                        Проект <strong>будет жить</strong>, потому что мы в него верим.
                    </p>
                    <p>
                        Средства инвесторов, конечно, будут возвращены — это обязанность Pinksale. А мы начнём заново, став сильнее.
                    </p>
                </div>

                {/* ========== ССЫЛКА НА СТРАНИЦУ ТОКЕНА ========== */}
                <div className="roadmap-footer">
                    <p>
                        Подробнее о токеномике и цифрах пресейла читайте на странице&nbsp;
                        <Link href="/token" className="token-link">токена Emerald (EME)</Link>.
                    </p>
                    <p className="prototype-note">
                        Этот сайт — прототип. Мы активно работаем над механиками, смарт-контрактами и бэкендом.
                        Но даже сейчас вы видите, что продукт жив. Если что-то пойдёт не так — мы не убежим.
                        Мы исправим и начнём заново. <strong>Проект будет жить.</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}