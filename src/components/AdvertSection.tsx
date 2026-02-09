import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { initAdvertAnimations } from './AdvertSection.animations.ts';
import './AdvertSection.css';
import clubbingAdvert from '../assets/clubbingAdvert.png';

const AdvertSection: React.FC = () => {
    const pathRef = useRef<SVGPathElement>(null);
    const advertContainerRef = useRef<HTMLDivElement>(null);
    const advertRef = useRef<HTMLImageElement>(null);
    const joinButtonRef = useRef<HTMLHeadingElement>(null);
    const familyTlRef = useRef<gsap.core.Timeline | null>(null);

    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    useGSAP(() => {
        if (!pathRef.current) return;

        const { familyTl } = initAdvertAnimations(
            advertContainerRef,
            pathRef,
            joinButtonRef,
            start,
            end
        );

        familyTlRef.current = familyTl;
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


    return (
        <div ref={advertContainerRef} className="advert-container">
            <h1 ref={joinButtonRef}
                onClick={familyClicked}
                className="join-button">
                {`{{ JOIN THE FAMILY }}`}
            </h1>
            <img
                ref={advertRef}
                className="advert-img"
                src={clubbingAdvert}
                alt="advert"
            />
            <div className="svg-wrapper">
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
    );
};

export default AdvertSection;
