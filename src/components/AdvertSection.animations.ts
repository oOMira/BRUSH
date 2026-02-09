import gsap from 'gsap';

export const initAdvertAnimations = (
    advertContainerRef: React.RefObject<HTMLDivElement>,
    pathRef: React.RefObject<SVGPathElement>,
    joinButtonRef: React.RefObject<HTMLHeadingElement>,
    start: string,
    end: string
) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(pathRef.current, {
        attr: { d: start },
        ease: "power2.in",
        duration: 0.5,
    }).to(pathRef.current, {
        attr: { d: end },
        ease: "power2.out",
        duration: 0.5,
    });

    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: advertContainerRef.current,
            start: 'bottom bottom',
            end: '+=150%',
            pin: true,
            pinSpacing: false,
            scrub: 0,
        }
    });

    scrollTl.fromTo(
        joinButtonRef.current,
        {
            opacity: 0
        },
        {
            opacity: 1,
            duration: 0.1,
            ease: 'power2.out',
            onComplete: () => {
                if (!joinButtonRef.current) return;
                joinButtonRef.current.style.pointerEvents = 'auto';
            },
        }
    );

    scrollTl.to(joinButtonRef.current, {
        opacity: 1,
        duration: 0.45,
        onComplete: () => {
            if (!joinButtonRef.current) return;
            joinButtonRef.current.style.pointerEvents = 'none';
        },
        onReverseComplete: () => {
            if (!joinButtonRef.current) return;
            joinButtonRef.current.style.pointerEvents = 'none';
        }
    });

    scrollTl.to(joinButtonRef.current, {
        opacity: 0,
        duration: 0.1,
        ease: 'power2.in',
        onReverseComplete: () => {
            if (!joinButtonRef.current) return;
            joinButtonRef.current.style.pointerEvents = 'auto';
        }
    });

    scrollTl.to(joinButtonRef.current, {
        opacity: 0,
    });

    return { familyTl: tl, scrollTl };
};
