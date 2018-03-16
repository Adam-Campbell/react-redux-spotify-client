const permissionsRequired = [
    'playlist-modify-private',
    'playlist-modify-public',
    'playlist-read-collaborative',
    'playlist-read-private',
    'ugc-image-upload',
    'user-follow-modify',
    'user-follow-read',
    'user-library-read',
    'user-read-playback-state',
    'user-read-private',
    'user-read-recently-played',
    'user-top-read'   
];
const clientID = 'bc785a3e64da41a8a122a4458dc4afc3';
const redirectURI = process.env.callbackURL;


export const authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&show_dialog=false&scope=${permissionsRequired.join(',')}`;