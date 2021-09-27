import React, {Component} from "react";
import img from "../images/Test2.png"
import "../css/model.css"
import axios from 'axios'

class Modal extends Component {

    constructor(props) {
        super(props);

        this.UploadMethod = this.UploadMethod.bind(this);
    }

    /**
     * Method to get Google photos authorization and photo upload
     * @param url
     * @constructor
     */
    UploadMethod(url) {

        axios.post('http://localhost:8000/google/login', {photoUrl: url}).then(response => {
            console.log(response.data)

            const windowdata = window.open('http://localhost:8000/google/auth/google', "_self");
        })
    }

    render() {
        return (
            <div className="card text-center " style={{
                display: "inline-block",
                width: "18rem",
                flex: 2,
                marginLeft: '2rem',
                marginTop: '1rem',
                height: "24rem"
            }}>
                <div className="overflow">
                    <img src={this.props.url} className='card-img-top' style={{width: '18rem', height: '18rem'}}/>
                </div>
                <div className="card-body text-dark">
                    <button href="#" className="btn btn-outline-success"
                            onClick={() => this.UploadMethod(this.props.url)}> Upload
                    </button>
                </div>
            </div>
        )
    }
}

export default Modal;
