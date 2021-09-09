
import React,{Component} from 'react';
import axios from 'axios';



class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.UploadToFBButton = this.UploadToFBButton.bind(this);
    }


    componentDidMount() {
        this.UploadToFBButton()
    }

    UploadToFBButton (){

        axios.get("/ha").then(response => {
            console.log(response)
        })
    }
    render() {
        return (
            <div className="App">
                <button onClick={this.UploadToFBButton}>Upload</button>

            </div>
        );
    }
}

export default MainPage;
