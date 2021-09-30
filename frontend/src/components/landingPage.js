import React, {Component} from "react";
import {Button, ButtonGroup} from 'reactstrap';
import "../css/landing.css";
import axios from "axios";
import * as QueryString from "query-string";


class landingPage extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Check for AuthCode on component mount
     * if found, pass to the API getAccessToken
     */
    componentDidMount() {

        const urlCode = QueryString.parse(window.location.search)

        if (urlCode.code !== undefined) {

            axios.post('http://localhost:8000/fb/getAccessToken', urlCode)
            .then(res => {
                this.props.history.push('/home');
            })
        } else {
            console.log("Else")
        }
    }

    /**
     * Handle click event of the button
     * Call the API getAccessCode
     * Redirect to home page
     */
    handleClick() {

        axios.post("http://localhost:8000/fb/getAccessCode")
            .then(async response => {
                window.location.href = response.data.url
            })

    }


    render() {
        return (
            <div className="landing">
                <Button className="custom-btn" variant="light" onClick={this.handleClick}>Log In with Facebook</Button>
            </div>

        );
    }

}

export default landingPage
