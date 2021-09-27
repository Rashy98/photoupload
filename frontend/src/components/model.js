import React from "react";
import img from "../images/Test2.png"
import "../css/model.css"

const Modal = props =>{

    console.log(props.url)
    return(
        <div className= "card text-center" style={{display:"inline-block",width:"18rem", flex:2}}>
            <div className="overflow">
                <img src={props.url} className='card-img-top'/>
            </div>
            <div className="card-body text-dark">
                <a href="#" className="btn btn-outline-success" >Upload </a>

            </div>
        </div>

    )

}

export default Modal;
