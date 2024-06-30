// * React and Redux:
import React from 'react';

// * Views:
import { HomeView } from './views/HomeView';

// * Styles:
import './assets/styles/root.css';

function App() {

    return (
        <div className="app">
            <HomeView />
        </div>
    );
}

export default App;