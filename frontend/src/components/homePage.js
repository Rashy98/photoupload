import React, {Component, useState} from "react";
import img from "../images/Test2.png";
import 'reactjs-popup/dist/index.css';
import Cards from "../components/cards"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../css/home.css"
import TopBar from "../images/topbar.jpg"


class homePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">
                <div className="homeback" style={{marginBottom: "2%", display: 'flex', justifyContent: 'flex-end'}}>
                    <img src={TopBar} style={{width: "100%", marginBottom: "%"}}/>
                </div>

                <div className="py-3">
                    <div className='container'>
                        <div className="row">
                            <Cards/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default homePage