
import React,{Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import * as QueryString from "query-string";



class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.UploadToFBButton = this.UploadToFBButton.bind(this);
    }


    componentDidMount() {
        const urlParams = QueryString.parse(window.location.search)
        console.log(urlParams)


        if (urlParams.code !== undefined){
            axios.post('http://localhost:8000/fb/getAccessToken', urlParams)
        } else {
            axios.post('http://localhost:8000/fb/getAccessCode')
                .then(response => {
                    window.location.href = response.data.url
                })
        }
    }

    UploadToFBButton (){

        window.open(' http://localhost:8000/google/auth/google',"_self");
        // axios.get('/auth/google').then(response => {
        //     console.log(response.data)
        // }
        // );
    }
    render() {
        return (
            <div className="App">
                <h1>Download from FB and Upload to Google photos</h1>
{/*                <img src='https://scontent.fcmb1-2.fna.fbcdn.net/v/t1.6435-9/p720x720/67281839_2078958799072051_4750904767692144640_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=dd9801&_nc_ohc=Aj7QWMZswu8AX-j20p5&_nc_ht=scontent.fcmb1-2.fna&edm=AMAeTUEEAAAA&oh=75*/}
{/*7e003f0fe864b7fd34f8b7ddc3d407&oe=616AE5D6'/>*/}
                <Link to=''>Download</Link>
                <Link to='/login'>Upload</Link>

            </div>
        );
    }
}

export default MainPage;
