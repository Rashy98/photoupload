const bodyParser = require('body-parser');
const express = require('express');
const router = require('express').Router();
const app = express();
const passport = require('passport');
const auth = require('../auth');
const GoogleStrategy = require('passport-google-oauth20').Strategy
auth(passport);
const config = require('../config');
let request = require('request').defaults({encoding: null});
const axios = require('axios');
const constants = require('../common/constants')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let photoUrls = '';

/**
 * Login route for Google API
 */
router.route('/login').post((req, res) => {

    photoUrls = req.body.photoUrl;

    if (!req.user || !req.isAuthenticated()) {
        res.status(200).json({path: '/'});
    } else {
        uploadImage(user.token, photoUrls);
    }
})


/**
 * Logout route for Google API
 */
router.route('/logout').get((req, res) => {
    req.logout();
    req.session.destroy();
    res.status(200).json({loggedout: constants.YES})
})


/**
 * Start the OAuth login process for Google
 */
router.get('/auth/google', passport.authenticate('google', {
        scope: config.scopes,
        failureFlash: true,  // Display errors to the user.
        session: true,
    }
));


/**
 * Callback receiver for the OAuth process after log in
 */
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/', failureFlash: true, session: true}),
    (req, res) => {

        uploadImage(req.user.token, photoUrls);

        return res.redirect(constants.GOOGLE_REDIRECT_URL);
    });


/**
 * This function will upload photos
 * @param userToken
 * @param url
 */
function uploadImage(userToken, url) {

    request.get(url, function (err, res, img) {

        const header = {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': constants.CONTENT_TYPE_OCTECT_STREAM,
            'X-Goog-Upload-Content-Type': constants.IMAGE_OR_JPG,
            'X-Goog-Upload-Protocol': constants.RAW
        }

        axios.post('https://photoslibrary.googleapis.com/v1/uploads', body = img, {headers: header})
            .then(resp => {
                const header2 = {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-type': constants.CONTENT_TYPE_APPLICATION_JSON,

                }

                const data2 = {
                    'newMediaItems':
                        [
                            {
                                "description": constants.DESCRIPTION,
                                "simpleMediaItem": {
                                    "uploadToken": resp.data
                                }
                            }
                        ]
                }

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
