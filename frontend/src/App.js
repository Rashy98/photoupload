import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from "./pages/MainPage";
import Login from './pages/Login';
import Landing from './components/landingPage'
import Home from "./components/homePage"




function App() {
    return (
        <Router>
            <switch>
                {/*<Route path="/" exact component={MainPage}/>*/}
                <Route path="/login" exact component={Login}/>
                <Route path="/main" exact component={MainPage}/>
                <Route path="/" exact component={Landing}/>
                <Route path="/home" exact component={Home}/>
            </switch>
        </Router>
    );
}

export default App;
