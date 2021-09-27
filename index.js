'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const session = require('express-session');
const sessionFileStore = require('session-file-store');
const cors = require('cors');
const app = express();
const fileStore = sessionFileStore(session);
const server = http.Server(app);
const passport = require('passport');
const auth = require('./auth');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const env = require('dotenv').config()

auth(passport);

app.use(cors());
// Use the EJS template engine
app.set('view engine', 'ejs');

// Set up a session middleware to handle user sessions.
// NOTE: A secret is used to sign the cookie. This is just used for this sample
// app and should be changed.
const sessionMiddleware = session({
    resave: true,
    saveUninitialized: true,
    store: new fileStore({}),
    secret: 'photo frame sample',
});


// Set up static routes for hosted libraries.
app.use(express.static('static'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist/'));

// Parse application/json request data.
app.use(bodyParser.json());

// Parse application/xwww-form-urlencoded request data.
app.use(bodyParser.urlencoded({extended: true}));

// Enable user session handling.
app.use(sessionMiddleware);

// Set up passport and session handling.
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

const fb = require('./routes/fb.route')
const google = require('./routes/google.route')

app.use('/fb', fb)
app.use('/google', google)


// Start the server
server.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);

});
