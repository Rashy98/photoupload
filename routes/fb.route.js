const bodyParser = require('body-parser');
const express = require('express');
const router = require('express').Router();
const {FB} = require('fb')
const QueryString = require('query-string')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

/********************* ENV FILE EKATA DANNA **********************/
//fb related
const clientId = 396783145400604
const appSecret = 'a95b69e021f05cd090893ef371b3c63e'

const redirectURI = 'http://localhost:3000/'


router.route('/connectLibrary').get((request, response) => {

    // FB.api('me', {fields : ['id', 'name', 'email', 'birthday', 'photos']},function (res){
    //     if(!res || res.error) {
    //         console.log(!res ? 'error occurred' : res.error);
    //         return response.status(400).json({success : false, error : res.error});
    //     }
    //     console.log(res.id);
    //     console.log(res.name);
    //     console.log(res.photos.data)
    //     return response.status(200).json({success : true, id : res.id, name : res.name});
    // })

    FB.api('691910607610748', {fields : ['images']},function (res){
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return response.status(400).json({success : false, error : res.error});
        }

        console.log(res)
        return response.status(200).json({success : true, response : res});
    })

})

router.route('/getAccessCode').get((request, response)=> {

    const stringifiedParams = QueryString.stringify({
        client_id : clientId,
        redirect_uri : redirectURI,
        scope : 'email, user_photos',
        response_type : 'code',
        auth_type : 'rerequest',
        display : 'popup'
    })

    const fbURL = `https://www.facebook.com/v11.0/dialog/oauth?${stringifiedParams}`


    return response.redirect(fbURL)
})

router.route('/getAccessToken').post((request, response) => {

    const code = request.body.code

    FB.api('oauth/access_token',
        {
            client_id : clientId,
            client_secret : appSecret,
            code : code,
            redirect_uri : redirectURI,
        }, function (res){
            if(!res || res.error){
                console.log((!res? 'error occurred ' : res.error))
                return response.status(400).json({success : false, error : res.error})
            }

            console.log(res.access_token)
            const token = res.access_token
            FB.setAccessToken(token)
            return response.status(200).json({success : true, token : res.access_token})
        })
})

module.exports = router;
