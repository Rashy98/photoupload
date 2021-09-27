import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Landing from './components/landingPage'
import Home from "./components/homePage"


function App() {
    return (
        <Router>
            <switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/home" exact component={Home}/>
            </switch>
        </Router>
    );
}

export default App;
