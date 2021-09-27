const bodyParser = require('body-parser');
const express = require('express');
const router = require('express').Router();
const {FB} = require('fb')
const QueryString = require('query-string')
const app = express();
const env = require('dotenv').config()
const constants = require('../common/constants')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

/* Get user photos from facebook */
router.route('/getPhotos').get(async (request, response) => {

    let array_urls = []

    FB.api(constants.ME, {fields : [constants.ID, constants.NAME, constants.EMAIL, constants.BIRTHDAY, constants.PHOTOS]},async function (res){
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return response.status(400).json({success : false, error : res.error});
        }
        console.log(res)
        for (let i = 0; i < res.photos.data.length; i++){

            let res_url = await FB.api(res.photos.data[i].id, {fields : [constants.IMAGES]})

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

/* Get access code from the facebook */
router.route('/getAccessCode').post((request, response)=> {

    const stringifiedParams = QueryString.stringify({
        client_id : process.env.CLIENT_ID,
        redirect_uri : process.env.REDIRECT_URI,
        scope : [constants.EMAIL, constants.USER_PHOTOS],
        response_type : constants.CODE,
        auth_type : constants.RE_REQUEST,
        display : constants.POPUP
    })

    const fbURL = process.env.ACCESS_CODE_URL + stringifiedParams

    return response.status(200).json({url : fbURL})
    // return response.redirect(fbURL)
})

/* Get access token from the facebook */
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

            const token = res.access_token
            FB.setAccessToken(token)

            return response.status(200).json({success : true, token : res.access_token})
        })
})

module.exports = router;
