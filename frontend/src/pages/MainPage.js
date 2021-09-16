
import React,{Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";



class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.UploadToFBButton = this.UploadToFBButton.bind(this);
    }


    componentDidMount() {
        // this.UploadToFBButton()
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

                <Link to=''>Download</Link>
                <Link to='/login'>Upload</Link>

            </div>
        );
    }
}

export default MainPage;
