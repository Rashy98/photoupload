import React,{Component} from "react";
import { Button, ButtonGroup } from 'reactstrap';
import * as QueryString from "query-string";
import "../css/landing.css";
const axios = require('axios')



class landingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            urlParams:""
        }
        this.handleClick = this.handleClick.bind(this);
    }
//    componentDidMount() {
//        const urlCode = QueryString.parse(window.location.search)
//        if (urlCode.code !== undefined){
//            console.log('URL ', urlCode)
//            axios.post('http://localhost:8000/fb/getAccessToken', urlCode)
//                .then(res => {
//                    this.props.history.push('/home');
//                })
//        }
//        else {
//            console.log("Else")
//        }
//    }

    handleClick() {

        this.props.history.push('/home');
//        axios.post("http://localhost:8000/fb/getAccessCode")
//            .then(async response => {
//                window.location.href = response.data.url
//
//
//            })

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