import React, {Component} from "react";
import Modal from "../components/model"
import "../css/model.css"
const axios = require('axios')

class cards extends Component{
    constructor() {
        super();
        this.state={
            photoUrls:[
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.6435-9/p720x720/242225399_391006019096187_2694479162616472562_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=dd9801&_nc_ohc=6HgtUAXhSasAX_ZnOI9&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=c2d74a08776493f04193453fe62704d0&oe=6175A4E1",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.6435-9/p600x600/61870598_2235131153201843_1565606602633904128_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8024bb&_nc_ohc=5NLR4u-0ZO4AX_pgO5t&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=ec5f4d388e28a6872200df9bdedcf757&oe=61766114",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.6435-9/p960x960/42044680_2427122523969022_2843650808199774208_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=e007fa&_nc_ohc=Zw7mh3ENKikAX_Gppla&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=19982fc8e1269c3c4ea407ec8a5e391c&oe=6176F735",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.6435-9/p960x960/44124489_1908328699215425_8281326279655948288_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8024bb&_nc_ohc=iYbo4aNcYCEAX-dASIP&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=d1126ae0b1d6eac84816abfe9ff3b3c7&oe=61769B4E",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.6435-9/p960x960/31488788_514927795575931_8069666851040264192_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=e007fa&_nc_ohc=6ov3j-CwEWUAX_Bey9q&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=4bacd9a02efed347062fdcc92f77924d&oe=61771A30",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.18169-9/p600x600/26230862_1574041869310778_3369040458310017173_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=110474&_nc_ohc=OLhDeC6SxmwAX9IHW_M&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=a9c731acfa3212b38bbb938e49e88b06&oe=6177A200",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t31.18172-8/p960x960/12474000_965031686878469_8551394429904682919_o.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7aed08&_nc_ohc=63qVDlsjXFYAX-VymKO&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=77b108b0eaf80eabb9fcd27529360fa0&oe=617660D4",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.18169-9/p320x320/1010326_948091061905865_8210329301058206599_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=7aed08&_nc_ohc=Rjwyb_3O8T0AX_H30qq&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=60ec4c3c9d87ba762fccee551893bf92&oe=617702FB",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.18169-9/p320x320/156049_630113133753965_2617516815240413851_n.png?_nc_cat=105&ccb=1-5&_nc_sid=e007fa&_nc_ohc=TY_rIfF_35gAX81bEuJ&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=fa362eaeb17d438472da4436456963d1&oe=61766F43",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.18169-9/p480x480/10387216_601299439968668_7519697715012572501_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=e007fa&_nc_ohc=rWWM4T4MpLMAX-KKj3D&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=49837ae8ca66ba6c00226bdc72482801&oe=61774DE3",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.18169-9/p600x600/10388119_586889018076377_8317919080277888753_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=e007fa&_nc_ohc=gBQab1UcJBcAX9UkRLh&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=e7bc9f8a3f62c7c14f1e8180130b1897&oe=61790973",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.18169-9/p600x600/10390356_586348548130424_680563767896181937_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=e007fa&_nc_ohc=D0Jf5Ll2rgsAX-A6xBk&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=27b6d016f6a9605023ce39984ca3811b&oe=6178F4B2",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.18169-9/p600x600/10152568_845609105452529_1058772706_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=5EIAGAClQvAAX94SkVn&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=b933b1386d5859b57ad681c045c6db49&oe=61789CEF",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t31.18172-8/p960x960/1899278_839011382778968_1164796572_o.jpg?_nc_cat=101&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=YYurXqK65C0AX8hi5K8&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=0f853f8e1bc22cb157f22c9cefdaeee3&oe=61757DF7",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.18169-9/p320x320/1901787_538006472964632_406873771_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=e007fa&_nc_ohc=WW4v6XHe_x8AX_deMjo&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=464a7c3cc2a1f81e113de43de1915930&oe=6176A0E5",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.18169-9/p320x320/999220_537007829731163_406881455_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=e007fa&_nc_ohc=Qzh6TmOSVBQAX-6qLB7&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=e1891a954d02c587a9e022fe4430e5c5&oe=6177F06C",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.18169-9/p320x320/1489117_778315668848540_932319024_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=dCX39C5uPCMAX_0dYQS&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=d40f7200fc4c89b0ae8b12569d7c853e&oe=61767606",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t31.18172-8/p960x960/1399757_738664642813643_1346714724_o.jpg?_nc_cat=111&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=VosWkqVbL_oAX8ufOWe&_nc_oc=AQnRtrI1iLAoDaBwT3zi0np2S_hBtpEAj4BNt9AofFkPL1dHLPzMXeYtPQT3n5GYwyU&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=64aa0dd2a027b98476d7ecc6f0d4736c&oe=6176EBD1",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t31.18172-8/p960x960/1397827_737727949573979_1168367958_o.jpg?_nc_cat=109&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=-51VY9fqX5IAX_KBRgr&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=c8c92543db733a6d3f7a2f253b02a72b&oe=6178CDDF",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t31.18172-8/p960x960/1263053_734806486532792_877256100_o.jpg?_nc_cat=107&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=7rO5qYXXOckAX-pwXQH&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=d2007ee5fd1b10ebe6d62b073ce3766e&oe=61790320",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t31.18172-8/p960x960/1239277_723573214322786_1071104369_o.jpg?_nc_cat=105&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=H5pb79SVnbYAX-Llhd0&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=627876be6623ce9bccefaf62606132b9&oe=61760413",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t31.18172-8/p600x600/322412_169925523104380_1717458945_o.jpg?_nc_cat=103&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=dicFLNuVpFQAX9_turd&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=0ef93602eea1d752e62f641aca0644c1&oe=6176AE48",
                                            "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.18169-9/p320x320/36675_109642729084040_1065776_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=e007fa&_nc_ohc=DAkJ4aFq_-8AX_QIW7i&_nc_ht=scontent.fcmb2-2.fna&edm=AMAeTUEEAAAA&oh=3ae0d13b0383e908091584d153dd02e1&oe=6178401F"
                                            ],
            isLoaded: true
        }
    }

//    componentDidMount() {
//        axios.get("http://localhost:8000/fb/getPhotos")
//            .then(res =>{
//                console.log(res.data.name)
//                this.setState({photoUrls:res.data.ids, isLoaded:true})
//            })
//    }

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