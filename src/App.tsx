import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import EffectSection from './components/EffectSection';
import AdvertSection from './components/AdvertSection';
import Footer from './components/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

interface Emoji {
    id: number;
    x: number;
    y: number;
    emoji: string;
}

function App() {
    const [tween, setTween] = useState<boolean>(true);
    const [emojis, setEmojis] = useState<Emoji[]>([]);

    return (
        <>
            <Hero 
                tween={tween} 
                setTween={setTween} 
                emojis={emojis} 
                setEmojis={setEmojis} 
            />
            <EffectSection />
            <AdvertSection />
            <Footer />
        </>
    );
}

export default App;