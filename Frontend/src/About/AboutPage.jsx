import React from 'react';
import Hero from './Hero';
import Team from './Team';

function About() {
    return (
        <>
            <div style={{ marginTop: "50px" , background: "linear-gradient(135deg, #f1f1f1ff, #76acc7ff)"}}>
                <Hero />
            </div>
            <Team />
        </>
    );
}

export default About;
