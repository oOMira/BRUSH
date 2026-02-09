import gsap from 'gsap';

export const initFooterAnimations = (
    footerRef: React.RefObject<HTMLDivElement>,
    footerContainerRef: React.RefObject<HTMLDivElement>
) => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1,
        }
    });

    tl.to(
        footerContainerRef.current,
        {
            background: 'rgba(0, 0, 0, 0.7)'
        }
    );

    return tl;
};
