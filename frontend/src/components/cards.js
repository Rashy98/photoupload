import React, {Component} from "react";
import Modal from "../components/model"
import "../css/model.css"
const axios = require('axios')

class cards extends Component{
    constructor() {
        super();
        this.state={
            photoUrls:[],
            isLoaded: false
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8000/fb/getPhotos")
            .then(res =>{
                console.log(res.data.name)
                this.setState({photoUrls:res.data.ids, isLoaded:true})
            })
    }

    render() {
        return(
            <div className=" " >
                <div  className="grid">

                        {this.state.isLoaded?
                            this.state.photoUrls.map(id =>{
                                return(
                                    // <div className="col-md-4">
                                        <Modal url = {id}/>
                                    // {/*</div>*/}
                                )
                            })

                            : <div></div>
                        }

                </div>
            </div>
        )
    }
}
export default cards