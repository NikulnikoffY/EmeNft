"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";   // ← добавили импорт Link

interface CarouselItem {
    id: number;
    title: string;
    price: number;
    image: string;
    author: string;
}

interface CarouselProps {
    items: CarouselItem[];
    baseSpeed?: number;
    speedMultiplier?: number;
}

const Carousel = ({ items, baseSpeed = 30, speedMultiplier = 5 }: CarouselProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const speedRef = useRef(baseSpeed);
    const animationRef = useRef<number | null>(null);
    const lastTimestampRef = useRef(0);

    useEffect(() => {
        const autoScroll = (timestamp: number) => {
            if (!containerRef.current) return;
            
            if (!isDragging.current) {
                speedRef.current = speedRef.current * 0.98 + baseSpeed * 0.02;
                const delta = (timestamp - lastTimestampRef.current) / 1000;
                containerRef.current.scrollLeft += speedRef.current * delta;
            }
            
            lastTimestampRef.current = timestamp;
            animationRef.current = requestAnimationFrame(autoScroll);
        };
        
        animationRef.current = requestAnimationFrame(autoScroll);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [baseSpeed]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX - containerRef.current.offsetLeft;
        scrollLeft.current = containerRef.current.scrollLeft;
        document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return;
        e.preventDefault();
        
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        containerRef.current.scrollLeft = scrollLeft.current - walk;
        
        const dragSpeed = Math.abs(walk) * speedMultiplier;
        speedRef.current = Math.min(baseSpeed + dragSpeed, baseSpeed * 5);
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.body.style.userSelect = "";
    };

    const duplicatedItems = [...items, ...items];

    return (
        <div className="carousel-container">
            <div
                ref={containerRef}
                className="carousel-track"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
            >
                {duplicatedItems.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="carousel-item">
                        <Link href={`/nft/${item.id}`} style={{ textDecoration: 'none' }}>
                            <div className="carousel-card">
                                <div className="carousel-image">
                                    <Image src={item.image} alt={item.title} width={200} height={200} />
                                </div>
                                <div className="carousel-info">
                                    <h4>{item.title}</h4>
                                    <p>{item.author}</p>
                                    <span>{item.price} EME</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;