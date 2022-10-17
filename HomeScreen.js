import React from 'react';
import Features from './Features';
import Hero from './Hero';

function HomeScreen() {
    return (
        <React.Fragment>
           <Hero />
           <Features/>
        </React.Fragment>
    )
}

export default HomeScreen;