// * React and Redux:
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProjectsData, setStatus } from './features/data/ProjectsDataSlice';

// * Views:
import { HomeView } from './views/HomeView';

// * Services:
import fetchProjectsData from './services/fetching/fetchProjectsData';

// * Styles:
import './assets/styles/root.css';

// * Translations:
import { useTranslation } from 'react-i18next';

function App() {

    const { i18n } = useTranslation();
    const dispatch = useDispatch();

    // Fetching and setting projects data:
    useEffect(() => {
        fetchProjectsData(setProjectsData, setStatus, dispatch);
    })

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