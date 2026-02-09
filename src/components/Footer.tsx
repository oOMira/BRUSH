import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { initFooterAnimations } from './Footer.animations.ts';
import './Footer.css';

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLImageElement>(null);
    const footerContainerRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        initFooterAnimations(footerRef, footerContainerRef);
    }, { scope: footerContainerRef });

    return (
        <div ref={footerContainerRef} className="footer-container">
            <div ref={footerRef} className="footer-content">
                <h1>Footer</h1>
            </div>
        </div>
    );
};

export default Footer;
