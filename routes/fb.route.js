const bodyParser = require('body-parser');
const express = require('express');
const router = require('express').Router();
const {FB} = require('fb')
const QueryString = require('query-string')
const app = express();
const env = require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


router.route('/connectLibrary').get(async (request, response) => {

    let array_ids = []
    let array_urls = []

    FB.api('me', {fields : ['id', 'name', 'email', 'birthday', 'photos']},async function (res){
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return response.status(400).json({success : false, error : res.error});
        }

        for (let i = 0; i < res.photos.data.length; i++){
            array_ids.push(res.photos.data[i].id)

            let res_url = await FB.api(res.photos.data[i].id, {fields : ['images']})

            if (!res_url || res_url.error) {
                console.log(!res_url ? 'error occurred' : res_url.error);
                return response.status(400).json({success: false, error: res_url.error});
            }

            array_urls.push(res_url.images[1].source)
        }

        console.log(array_urls)

        return response.status(200).json({success : true, id : res.id, name : res.name, ids : array_urls});
    })

})

router.route('/getAccessCode').get((request, response)=> {

    const stringifiedParams = QueryString.stringify({
        client_id : process.env.CLIENT_ID,
        redirect_uri : process.env.REDIRECT_URI,
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
            client_id : process.env.CLIENT_ID,
            client_secret : process.env.APP_SECRET,
            code : code,
            redirect_uri : process.env.REDIRECT_URI,
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
