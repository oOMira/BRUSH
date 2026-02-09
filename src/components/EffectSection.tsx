import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { initEffectAnimations } from './EffectSection.animations.ts';
import './EffectSection.css';
import table from '../assets/table.png';
import handheld from '../assets/handheld.png';
import brush from '../assets/brush.png';
import dildo from '../assets/dildo.png';
import whisk from '../assets/whisk.png';
import disco from '../assets/disco.png';
import shaver from '../assets/shaver.png';

const EffectSection: React.FC = () => {
    const effectContainerRef = useRef<HTMLDivElement>(null);
    const effectRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLImageElement>(null);
    const handheldRef = useRef<HTMLImageElement>(null);

    const dildoRef = useRef<HTMLImageElement>(null);
    const whiskRef = useRef<HTMLImageElement>(null);
    const discoRef = useRef<HTMLImageElement>(null);
    const brushRef = useRef<HTMLImageElement>(null);
    const shaverRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        initEffectAnimations(
            effectContainerRef,
            tableRef,
            handheldRef,
            discoRef,
            shaverRef,
            dildoRef,
            brushRef,
            whiskRef
        );
    }, { scope: effectContainerRef });

    return (
        <div ref={effectContainerRef} className="effect-container">
            <div ref={effectRef} className="effect-inner">
                <div className="effect-spacer"></div>
                <img
                    ref={handheldRef}
                    className="handheld-img"
                    src={handheld}
                    alt="toothbrush handheld"
                />
                <img
                    ref={tableRef}
                    className="table-img"
                    src={table}
                    alt="table"
                />

                <img
                    ref={brushRef}
                    className="floating-img"
                    style={{ scale: '0.85' }}
                    src={brush}
                    alt={"brush"}
                />
                <img
                    ref={discoRef}
                    className="floating-img"
                    style={{ scale: '1' }}
                    src={disco}
                    alt={"disco"}
                />
                <img
                    ref={dildoRef}
                    className="floating-img"
                    style={{ scale: '1.2' }}
                    src={dildo}
                    alt={"dildo"}
                />
                <img
                    ref={whiskRef}
                    className="floating-img"
                    style={{ scale: '1.2' }}
                    src={whisk}
                    alt={"whisk"}
                />

                <img
                    ref={shaverRef}
                    className="floating-img"
                    style={{ scale: '0.9' }}
                    src={shaver}
                    alt={"shaver"}
                />
            </div>
        </div>
    );
};

export default EffectSection;
