import React from 'react';
import Hero from './Hero';
import YourNeed from './YourNeed';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Testimonials from "./Testimonials";

function Home() {
    return (
        <>
          
            <Hero />
            <YourNeed />
            <Testimonials />
            
        </>
    );
}

export default Home;
