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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let user = '';

router.route('/login').get((req, res) => {
    console.log(res);
    if (!req.user || !req.isAuthenticated()) {
        // Not logged in yet.
        res.status(200).json({path: '/'});
    } else {
        res.status(200).json({path: '/pages'});
        // res.render('pages/frame');
    }
})


router.route('/logout').get((req, res) => {
    req.logout();
    req.session.destroy();
    // res.redirect('/');
    res.status(200).json({loggedout:'yes'})
})

// Start the OAuth login process for Google.
router.get('/auth/google', passport.authenticate('google', {
        scope: config.scopes,
        failureFlash: true,  // Display errors to the user.
        session: true,
    }
));
//
// router.route('/auth/google',   passport.authenticate('google', {
//         scope: config.scopes,
//         failureFlash: true,  // Display errors to the user.
//         session: true,
//     }
//     )
// ).get((req,res)=>{
//     console.log('aawa');
//     window.open('http://localhost:8000/google/auth/google','_self');
//     // res.redirect('http://localhost:8000/google/auth/google/callback');
// });

// Callback receiver for the OAuth process after log in.
router.get('/auth/google/callback',
    passport.authenticate(
        'google',
        {failureRedirect: '/', failureFlash: true, session: true}), (req, res) => {
        // User has logged in.
        // logger.info('User has logged in.');
        user = req.user
        console.log('logged in')
        return res.redirect('http://localhost:3000/login');
        // res.status(200).json({logged: 'yes'});
    });

router.post('/uploadImage',async (req,res)=>{
    // const userID = req.user.profile.id;
    console.log(user.token);
    let image = ""

    let filePath = './images.png'
    console.log(typeof fs.readFileSync(filePath))

    let urls = 'https://www.spectatornews.com/wp-content/uploads/2020/04/WEB_1DReunion_Submitted.jpg'


    request.get(urls, function (err, res, bod) {
        image = bod
        // console.log(image.toString())

        const header = {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/octet-stream',
            'X-Goog-Upload-File-Name': 'WEB_1DReunion_Submitted-900x506.jpg',
            'X-Goog-Upload-Content-Type': 'image/jpg',
            'X-Goog-Upload-Protocol': 'raw'
        }
        // body = fs.readFileSync(filePath),
        axios.post('https://photoslibrary.googleapis.com/v1/uploads',
            // body = fs.readFileSync(filePath),
            body = bod,
            {
                headers: header
            }).then(resp => {
            console.log(resp.data)
            const header2 = {
                'Authorization': `Bearer ${user.token}`,
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
            }).then(resps => {
                console.log(resps.data.newMediaItemResults)
                // });
            });

            // axios.post('https://photoslibrary.googleapis.com/v1/uploads',data,{
            //     headers:header
            // } ).then(resp =>{
            //         console.log(utf8.encode(resp.data));
            //
            //     axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate',dataCreate,{
            //     headers:header2
            // } ).then(respp =>{
            //     console.log(respp.data)
            //     })

        })


    });



})

module.exports = router;
