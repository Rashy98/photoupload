const config = {};


/**
 * The callback to use for OAuth requests. This is the URL where the app is running
 * @type {string}
 */
config.oAuthCallbackUrl = 'http://localhost:8000/google/auth/google/callback';


/**
 * The scopes to request. The app requires the photoslibrary.readonly and plus.me scopes.
 * @type {string[]}
 */
config.scopes = [
  'https://www.googleapis.com/auth/photoslibrary',
  'profile',
];


/**
 * The API end point to use. Do not change.
 * @type {string}
 */
config.apiEndpoint = 'https://photoslibrary.googleapis.com';

module.exports = config;
