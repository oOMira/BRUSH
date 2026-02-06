import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clubbingAdvert from './assets/clubbingAdvert.png';
import table from './assets/table.png';
import handheld from './assets/handheld.png';

gsap.registerPlugin(ScrollTrigger);

interface Emoji {
    id: number;
    x: number;
    y: number;
    emoji: string;
}

function App() {
    const pathRef = useRef<SVGPathElement>(null);
    const advertContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const advertRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const effectContainerRef = useRef<HTMLDivElement>(null);
    const effectRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLImageElement>(null);
    const stretchRef = useRef<gsap.core.Tween | null>(null);
    const joinButtonRef = useRef<HTMLHeadingElement>(null);
    const handheldRef = useRef<HTMLImageElement>(null);
    const emojiRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});
    const familyTlRef = useRef<gsap.core.Timeline | null>(null);

    const [tween, setTween] = useState<boolean>(true);
    const [emojis, setEmojis] = useState<Emoji[]>([]);

    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    // Build the SVG curtain-reveal timeline inside useGSAP so it
    // runs after the DOM is ready and is properly cleaned up.
    useGSAP(() => {
        if (!pathRef.current) return;

        const tl = gsap.timeline({ paused: true });

        // Animate the path's "d" attribute directly (no MorphSVG plugin needed)
        tl.to(pathRef.current, {
            attr: { d: start },
            ease: "power2.in",
            duration: 0.5,
        }).to(pathRef.current, {
            attr: { d: end },
            ease: "power2.out",
            duration: 0.5,
        });

        familyTlRef.current = tl;
    }, { scope: advertContainerRef });

    const familyClicked = () => {
        const tl = familyTlRef.current;
        if (!tl) return;

        if (tl.progress() === 0 || tl.reversed()) {
            tl.play();
        } else {
            tl.reverse();
        }
    };

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
                gsap.fromTo(
                    emojiElement,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    }
                );

                gsap.to(emojiElement, {
                    opacity: 0,
                    scale: 0.5,
                    duration: 1.0,
                    delay: 2.0,
                    ease: 'power2.in'
                });
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

        stretchRef.current = gsap.to(textRef.current, {
            translateX: translateX,
            translateY: translateY,
            scaleX: scaleX,
            scaleY: scaleY,
            skewX: skewX,
            skewY: skewY,
            ease: 'power2.out'
        });
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: '1px top',
                end: 'bottom top',
                scrub: 1,
                pin: true,
                pinSpacing: false,
                markers: false,
                refreshPriority: 2,
                onEnter: () => {
                    setTween(false);
                    setEmojis([]);
                },
                onLeaveBack: () => {
                    setTween(true);
                }
            },
        });

        tl.fromTo(
            textRef.current,
            { scale: 1 },
            {
                scale: 50,
                duration: 0.9,
                translateX: 0.0,
                translateY: 0.0,
                skewX: 0.0,
                skewY: 0.0,
            }
        );

        tl.to(
            textRef.current,
            {
                opacity: 0
            }
        );
    }, { scope: containerRef });

    useGSAP(() => {
        const tl: gsap.core.Timeline = gsap.timeline({
            scrollTrigger: {
                trigger: effectContainerRef.current,
                start: 'top top',
                end: 'bottom top',
                pin: true,
                pinSpacing: true,
                scrub: 1,
                markers: false,
                refreshPriority: 1,
            },
        });

        tl.fromTo(
            tableRef.current,
            {
                opacity: 1,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
            }
        );

        tl.to(tableRef.current, {
            opacity: 1,
            duration: 0.2,
        });

        tl.to(tableRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
        });

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: effectContainerRef.current,
                start: 'top top',
                end: 'bottom+=20% top',
                scrub: 1,
                markers: false,
            },
        });

        tl2.to(handheldRef.current, {
            opacity: 1,
            duration: 0.75,
        });

        tl2.to(handheldRef.current, {
            opacity: 0.5,
            duration: 0.2,
            ease: 'power2.inOut',
        });

        tl2.to(handheldRef.current, {
            opacity: 0,
            ease: 'power2.in',
        });
    }, { scope: effectContainerRef });

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: advertContainerRef.current,
                start: 'center center',
                end: 'center top',
                pin: true,
                pinSpacing: true,
                markers: true,
                scrub: 0,
            }
        });

        tl.fromTo(
            joinButtonRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out',
            }
        );

        tl.to(joinButtonRef.current, {
            opacity: 1,
            duration: 0.6,
        });

        tl.to(joinButtonRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
        });
    }, { scope: advertContainerRef });

    return (
        <>
            <div
                onClick={onClick}
                onMouseMove={handleMouseMove}
                ref={containerRef}
                style={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
                <h1
                    onClick={onHeadlineClick}
                    ref={textRef}
                    style={{
                        width: 'fit-content',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none',
                        position: 'absolute',
                        zIndex: 1,
                        color: 'white',
                        fontSize: '20vh',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    BRUSH
                </h1>

                {emojis.map((emoji: Emoji) => (
                    <span
                        key={emoji.id}
                        ref={(el: HTMLSpanElement | null) => {
                            emojiRefs.current[emoji.id] = el;
                        }}
                        style={{
                            position: 'absolute',
                            left: emoji.x,
                            top: emoji.y,
                            fontSize: '10vh',
                            pointerEvents: 'none',
                            zIndex: 999,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {emoji.emoji}
                    </span>
                ))}
            </div>

            <div ref={effectContainerRef} style={{ height: '100vh' }}>
                <div ref={effectRef} style={{ height: '100%' }}>
                    <div style={{ height: '80vh' }}></div>
                    <img
                        ref={handheldRef}
                        style={{
                            position: 'absolute',
                            height: '22vh',
                            opacity: 1,
                            zIndex: 1,
                            left: '50%',
                            bottom: '2%',
                            transform: 'translate(-50%, 0%)',
                        }}
                        src={handheld}
                        alt="toothbrush handheld"
                    />
                    <img
                        ref={tableRef}
                        style={{
                            height: '20vh',
                            width: '100vw',
                            opacity: 0,
                        }}
                        src={table}
                        alt="table"
                    />
                </div>
            </div>

            <div ref={advertContainerRef} style={{
                position: 'relative',
                height: '100vh',
                width: '100vw',
            }}>
                <h1 ref={joinButtonRef}
                    onClick={familyClicked}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontWeight: 'bold',
                        opacity: 0,
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                        zIndex: 1,
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none',
                        cursor: 'pointer',
                    }}>
                    {`{{ JOIN THE FAMILY }}`}
                </h1>
                <img
                    ref={advertRef}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100vw'
                    }}
                    src={clubbingAdvert}
                    alt="advert"
                />
                <div className='wrapper'
                     style={{
                         position: 'absolute',
                         width: '100vw',
                         height: '100vh',
                         overflow: 'hidden',
                     }}>
                    <svg className="transition" viewBox="0 0 100 100" preserveAspectRatio="xMidYMin slice">
                        <defs>
                            <linearGradient id="grad" x1="0" y1="0" x2="99" y2="99" gradientUnits="userSpaceOnUse">
                                <stop offset="0.2" stopColor="rgb(0, 0, 0)"/>
                                <stop offset="0.7" stopColor="rgb(20, 20, 20)"/>
                            </linearGradient>
                        </defs>
                        <path ref={pathRef} className="path" stroke="url(#grad)" fill="url(#grad)" strokeWidth="2px"
                              vectorEffect="non-scaling-stroke" d="M 0 100 V 100 Q 50 100 100 100 V 100 z"/>
                    </svg>
                </div>
            </div>

            <div style={{
                position: 'relative',
                width: '100vw',
                height: '30vh'
            }}>
            </div>
        </>
    );
}

export default App;