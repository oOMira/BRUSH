import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { initHeroAnimations, animateEmoji, animateHeroStretch } from './Hero.animations.ts';
import './Hero.css';

interface Emoji {
    id: number;
    x: number;
    y: number;
    emoji: string;
}

interface HeroProps {
    tween: boolean;
    setTween: React.Dispatch<React.SetStateAction<boolean>>;
    setEmojis: React.Dispatch<React.SetStateAction<Emoji[]>>;
    emojis: Emoji[];
}

const Hero: React.FC<HeroProps> = ({ tween, setTween, setEmojis, emojis }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const stretchRef = useRef<gsap.core.Tween | null>(null);
    const emojiRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});

    const isInText = (event: React.MouseEvent<HTMLDivElement>): boolean => {
        if (!textRef.current) {
            return false;
        }

        const boundingRect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - boundingRect.left;
        const y = event.clientY - boundingRect.top;

        const textRect: DOMRect = textRef.current.getBoundingClientRect();

        return x > textRect.left && x < textRect.right && y > textRect.top && y < textRect.bottom;
    };

    const onClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (isInText(event)) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const newEmoji: Emoji = {
            id: Date.now(),
            x: x,
            y: y,
            emoji: '✨'
        };

        setEmojis((prev: Emoji[]) => [...prev, newEmoji]);

        setTimeout(() => {
            const emojiElement = emojiRefs.current[newEmoji.id];
            if (emojiElement) {
                animateEmoji(emojiElement);
            }
        }, 10);

        setTimeout(() => {
            setEmojis((prev: Emoji[]) => prev.filter((e: Emoji) => e.id !== newEmoji.id));
            delete emojiRefs.current[newEmoji.id];
        }, 3000);
    };

    const onHeadlineClick = (): void => {
        console.log('Headline clicked');
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (!tween || !containerRef.current || !textRef.current) return;
        if (isInText(event)) return;

        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        let xPercent = (mouseX / rect.width - 0.5) * 2;
        let yPercent = (mouseY / rect.height - 0.5) * 2;

        xPercent = Math.sin((Math.pow(Math.abs(xPercent), 2) * Math.PI) / 2) * xPercent;
        yPercent = Math.sin((Math.pow(Math.abs(yPercent), 2) * Math.PI) / 2) * yPercent;

        const scaleX = 1 + Math.abs(xPercent) * 0.05;
        const scaleY = 1 + Math.abs(yPercent) * 0.05;

        const textRect = textRef.current.getBoundingClientRect();
        const translateX = (xPercent * 0.1) * textRect.width;
        const translateY = (yPercent * 0.1) * textRect.height;

        const skewX = Math.sign(yPercent) * xPercent * 3;
        const skewY = Math.sign(xPercent) * yPercent * 3;

        stretchRef.current = animateHeroStretch(
            textRef,
            translateX,
            translateY,
            scaleX,
            scaleY,
            skewX,
            skewY
        );
    };

    useGSAP(() => {
        initHeroAnimations(containerRef, textRef, setTween, setEmojis);
    }, { scope: containerRef });

    return (
        <div
            onClick={onClick}
            onMouseMove={handleMouseMove}
            ref={containerRef}
            className="hero-container"
        >
            <h1
                onClick={onHeadlineClick}
                ref={textRef}
                className="hero-title"
            >
                BRUSH
            </h1>

            {emojis.map((emoji: Emoji) => (
                <span
                    key={emoji.id}
                    ref={(el: HTMLSpanElement | null) => {
                        emojiRefs.current[emoji.id] = el;
                    }}
                    className="emoji-span"
                    style={{
                        left: emoji.x,
                        top: emoji.y,
                    }}
                >
                    {emoji.emoji}
                </span>
            ))}
        </div>
    );
};

export default Hero;
