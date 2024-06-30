// * React and Redux:
import React from 'react';

// * Own components:
import { Header } from '../components/Header';
import { Content } from '../components/Content';
import { Footer } from '../components/Footer';

export const HomeView = () => {
    return(
        <>
            <Header />
            <Content />
            <Footer />
        </>
    )   
}