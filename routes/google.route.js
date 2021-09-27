const bodyParser = require('body-parser');
const express = require('express');
const router = require('express').Router();
const app = express();

const passport = require('passport');
const auth = require('../auth');
const GoogleStrategy = require('passport-google-oauth20').Strategy
auth(passport);
const config = require('../config');
const fs = require('fs');
var request = require('request').defaults({ encoding: null });
const axios = require('axios');
const http = require('http')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let user = '';
let photoUrls = '';

/* Login route for Google API */
router.route('/login').post((req, res) => {
    console.log(res);
    photoUrls = req.body.photoUrl;

    if (!req.user || !req.isAuthenticated()) {
        res.status(200).json({path: '/'});
    } else {
          uploadImage(user.token, photoUrls);
    }
})

/* Logout route for Google API */
router.route('/logout').get((req, res) => {
    req.logout();
    req.session.destroy();
    res.status(200).json({loggedout:'yes'})
})

/* Start the OAuth login process for Google. */
router.get('/auth/google', passport.authenticate('google', {
        scope: config.scopes,
        failureFlash: true,  // Display errors to the user.
        session: true,
    }
));

/* Callback receiver for the OAuth process after log in. */
router.get('/auth/google/callback',
    passport.authenticate(
        'google',
        {failureRedirect: '/', failureFlash: true, session: true}), (req, res) => {
        user = req.user
        uploadImage(user.token, photoUrls);

        return res.redirect('http://localhost:3000/home');
    });

/* This function will upload photos */
function uploadImage(userToken, url){

        let image = ""

        let urls = url
        console.log(urls)

        request.get(urls, function (err, res, bod) {
            image = bod

            const header = {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/octet-stream',
                'X-Goog-Upload-Content-Type': 'image/jpg',
                'X-Goog-Upload-Protocol': 'raw'
            }

            axios.post('https://photoslibrary.googleapis.com/v1/uploads',body = bod,{headers: header})
                .then(resp => {

                    const header2 = {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-type': 'application/json',

                    }
                const data2 = {

                    'newMediaItems':
                        [
                            {
                                "description": "test upload",
                                "simpleMediaItem": {
                                    "uploadToken": resp.data
                                }
                            }
                        ]


                }
                const dataCreate = {
                    'data': data2
                }
                const datanew = JSON.stringify(dataCreate)

                axios({
                    method: 'post',
                    url: 'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate',
                    headers: header2,
                    data: JSON.stringify(data2)
                })
            })
        });

}

module.exports = router;
