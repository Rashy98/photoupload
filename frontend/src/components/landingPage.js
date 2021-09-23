import React,{Component} from "react";
import { Button, ButtonGroup } from 'reactstrap';
import "../css/landing.css";
const axios = require('axios')

class landingPage extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log("OIiiiiiiii")

        // this.props.history.push('/home');
        axios.get("http://localhost:8000/fb/getAccessCode")
    }


    render() {
        return(
            <div className="landing">
                    <Button className="custom-btn"variant="light" onClick={this.handleClick}>Log In with Facebook</Button>
            </div>

        );
    }

}
export default landingPage