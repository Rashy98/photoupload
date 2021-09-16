const bodyParser = require('body-parser');
const express = require('express');
const router = require('express').Router();
const app = express();

const passport = require('passport');
const auth = require('../auth');
const GoogleStrategy = require('passport-google-oauth20').Strategy
auth(passport);
const config = require('../config');
//
// passport.serializeUser((user, done) => {
//     done(null, user.googleId||user.id);
// });
//
// passport.deserializeUser((googleId, done) => {
//     database.findOne({googleId : googleId}, function (err, user) {
//
//         done(null, user);
//     });
// });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// GET request to the root.
// Display the login screen if the user is not logged in yet, otherwise the
// photo frame.
// app.get('/login', (req, res) => {
//     if (!req.user || !req.isAuthenticated()) {
//         // Not logged in yet.
//         res.status(200).json({path:'/main'});
//     } else {
//         res.status(200).json({path:'/pages'});
//         // res.render('pages/frame');
//     }
// });

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

// GET request to log out the user.
// Destroy the current session and redirect back to the log in screen.
// app.get('/logout', (req, res) => {
//     req.logout();
//     req.session.destroy();
//     res.redirect('/');
// });

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
        console.log('logged in')
        return res.redirect('http://localhost:3000/login');
        // res.status(200).json({logged: 'yes'});
    });
//
// router.route('/auth/google/callback',
//     passport.authenticate(
//     'google',
//     {failureRedirect: '/', failureFlash: true, session: true})
//     ).get((req,res) =>{
//         console.log('logged in')
//         console.log(res)
//         res.redirect('http://localhost:3000/login');
//         res.status(200).json({logged: 'yes'});
// })
router.post('/uploadImage',async (req,res)=>{
    // const userID = req.user.profile.id;
    console.log(req);

})

module.exports = router;
