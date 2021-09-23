import React from "react";
import img from "../images/Test2.png"
import "../css/model.css"

const Modal = props =>{
    return(
        <div className= "card text-center">
            <div className="overflow">
                <img src={img} className='card-img-top'/>
            </div>
            <div className="card-body text-dark">
                <a href="#" className="btn btn-outline-success" >Upload </a>

            </div>
        </div>

    )

}

export default Modal;
