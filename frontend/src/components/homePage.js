import React,{Component, useState} from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import img from "../images/Test2.png";
import 'reactjs-popup/dist/index.css';
import ReactDOM from "react-dom";
import Cards from "../components/cards"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

import "../css/home.css"
import {Button} from "reactstrap";
import TopBar from "../images/topbar.jpg"
import {Popup} from "../components/popup";


class homePage extends Component {




    render() {
        return(
            <div className="">
                <div className="homeback" style={{marginBottom:"2%", display: 'flex', justifyContent: 'flex-end' }} >
                    <img src={TopBar} style={{width:"100%", marginBottom:"%"}}/>
                    <Button className="" variant="light" onClick={this.handleClick}>Log In </Button>
                </div>


                <div>
                    <Cards/>

                </div>
            </div>
        )
    }
}
export default homePage