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

function App() {

    const dispatch = useDispatch();

    // Fetching and setting projects data:
    useEffect(() => {
        fetchProjectsData(setProjectsData, setStatus, dispatch);
    })

    return (
        <div className="app">
            <HomeView />
        </div>
    );
}

export default App;