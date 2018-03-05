const permissionsRequired = [
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-follow-read',
    'user-library-read',
    'user-top-read',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-read-private',
    'ugc-image-upload',
    'playlist-modify-public',
    'playlist-modify-private'
];
const clientID = 'bc785a3e64da41a8a122a4458dc4afc3';
const redirectURI = 'http:%2F%2Flocalhost:8080';


export const authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&show_dialog=false&scope=${permissionsRequired.join(',')}`;