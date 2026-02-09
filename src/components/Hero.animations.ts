import gsap from 'gsap';

export const initHeroAnimations = (
    containerRef: React.RefObject<HTMLDivElement>,
    textRef: React.RefObject<HTMLHeadingElement>,
    setTween: (tween: boolean) => void,
    setEmojis: (emojis: any[]) => void
) => {
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

    return tl;
};

export const animateEmoji = (emojiElement: HTMLSpanElement) => {
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
};

export const animateHeroStretch = (
    textRef: React.RefObject<HTMLHeadingElement>,
    translateX: number,
    translateY: number,
    scaleX: number,
    scaleY: number,
    skewX: number,
    skewY: number
) => {
    return gsap.to(textRef.current, {
        translateX: translateX,
        translateY: translateY,
        scaleX: scaleX,
        scaleY: scaleY,
        skewX: skewX,
        skewY: skewY,
        ease: 'power2.out'
    });
};
