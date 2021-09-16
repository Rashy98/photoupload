import React,{Component} from 'react';
import axios from "axios";
import * as QueryString from 'query-string'


class Login extends Component{


    constructor(props) {
        super(props);

        this.LoginAuth = this.LoginAuth.bind(this);
    }

    componentDidMount() {
        const urlParams = QueryString.parse(window.location.search)

        if (urlParams.code !== undefined){
            axios.post('http://localhost:8000/fb/getAccessToken', urlParams)
        } else {
            axios.get('http://localhost:8000/fb/getAccessCode')
        }
    }


    LoginAuth(){

        axios.get('http://localhost:8000/google/login').then(response => {
            console.log(response.data)

            const windowdata = window.open('http://localhost:8000/google/auth/google',"_self");
            console.log(windowdata);
            // this.props.history.redirect(response.data.path);
            // axios.get('http://localhost:8000/google/auth/google').then(response => {
            //     console.log(response)
            // })


        })
    }

    render() {
        return (
            <div>
                <header
                    className="demo-header mdl-layout__header--fixed-header mdl-color--primary mdl-color-text--white">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">Photo Frame Sample</span>
                        <div className="mdl-layout-spacer"></div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable is-upgraded"
                             data-upgraded=",MaterialTextfield">

                        </div>
                    </div>
                </header>
                <main className="demo-main mdl-layout__content">
                    <div className="page-content mdl-grid">
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
                        <div
                            className="demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
                            <div className="login-img">
                                <img src="/imgs/Photo-frame-illustration.png" alt="Photo frame illustration" />
                            </div>
                            <h3>Set up your Photo Frame</h3>
                            <p>Put your favorite moments on display. To get set up, connect Photo Frame to your photo
                                library.</p>
                            <p>
                                <button className="gp-button raised"  onClick={this.LoginAuth}>
                                    Connect to Google Photos
                                </button>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
            );
    }
}
export default Login;
