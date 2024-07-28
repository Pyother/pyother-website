// * React and Redux:
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProjectsData, setStatus as setProjectsStatus } from './features/data/ProjectsDataSlice';
import { setServicesData, setStatus as setServicesStatus } from './features/data/ServicesDataSlice';
import { setDeviceType } from './features/display/DeviceTypeSlice';

// * Views:
import { HomeView } from './views/HomeView';

// * Services:
import fetchData from './services/fetching/fetchData';

// * Styles:
import './assets/styles/root.css';

// * Translations:
import { useTranslation } from 'react-i18next';

function App() {

    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    
    // Device type:
    useEffect(() => {
        
        const handleResize = () => {
            dispatch(setDeviceType(
                window.innerWidth > 960 ? 'desktop' : 'mobile'
            ));
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);

    // Fetching and setting projects data:
    useEffect(() => {
        fetchData(setProjectsData, setProjectsStatus, setServicesData, setServicesStatus, dispatch);
    });

    // Setting language:
    useEffect(() => {
        i18n.changeLanguage(localStorage.getItem('language') || 'pl');
    }, [i18n]);

    return (
        <div className="app">
            <HomeView />
        </div>
    );
}

export default App;