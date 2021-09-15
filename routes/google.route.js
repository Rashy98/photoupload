const bodyParser = require('body-parser');
const express = require('express');
const router = require('express').Router();
const app = express();

const passport = require('passport');
const auth = require('../auth');
const GoogleStrategy = require('passport-google-oauth20').Strategy
auth(passport);
const config = require('../config');

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
    if (!req.user || !req.isAuthenticated()) {
        // Not logged in yet.
        res.status(200).json({path: '/main'});
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
    res.redirect('/');
})

// Start the OAuth login process for Google.
router.get('/auth/google', passport.authenticate('google', {
        scope: config.scopes,
        failureFlash: true,  // Display errors to the user.
        session: true,
    }
));

// Callback receiver for the OAuth process after log in.
router.get('/auth/google/callback',
    passport.authenticate(
        'google',
        {failureRedirect: '/', failureFlash: true, session: true}), (req, res) => {
        // User has logged in.
        logger.info('User has logged in.');
        console.log('logged in')
        res.redirect('/login');
        res.status(200).json({logged: 'yes'});
    });

module.exports = router;