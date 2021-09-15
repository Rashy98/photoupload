import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from "./pages/MainPage";
import Login from './pages/Login';


function App() {
    return (
        <Router>
            <switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login" exact component={MainPage}/>
                <Route path="/main" exact component={MainPage}/>
            </switch>
        </Router>
    );
}

export default App;
