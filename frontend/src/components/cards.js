import React, {Component} from "react";
import Modal from "../components/model"
import "../css/model.css"

class cards extends Component{
    render() {
        return(
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-4">
                        <Modal/>
                    </div>
                    <div className="col-md-4">
                        <Modal/>
                    </div>
                    <div className="col-md-4">
                        <Modal/>
                    </div>
                </div>
            </div>
        )
    }
}
export default cards