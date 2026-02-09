import gsap from 'gsap';

export const initEffectAnimations = (
    effectContainerRef: React.RefObject<HTMLDivElement>,
    tableRef: React.RefObject<HTMLImageElement>,
    handheldRef: React.RefObject<HTMLImageElement>,
    discoRef: React.RefObject<HTMLImageElement>,
    shaverRef: React.RefObject<HTMLImageElement>,
    brushRef: React.RefObject<HTMLImageElement>,
    dildoRef: React.RefObject<HTMLImageElement>,
    whiskRef: React.RefObject<HTMLImageElement>
) => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: effectContainerRef.current,
            start: 'top top',
            end: 'bottom top',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            markers: false,
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

    const refs = [discoRef, shaverRef, brushRef, dildoRef, whiskRef];

    refs.forEach((ref, pos) => {
        tl.to(ref.current, {
            left: (pos * 15 + 12.5) + 'vw',
            duration: 0.2,
            ease: 'power2.in',
        }, 0.3);

        tl.to(ref.current, {
            left: "-40%",
            duration: 0.2,
            ease: 'power2.in',
        }, 0.8);
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
    
    return [tl, tl2];
};
