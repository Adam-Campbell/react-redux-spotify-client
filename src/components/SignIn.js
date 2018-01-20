import React from 'react';
import PropTypes from 'prop-types';

const SignIn = () => {
    return (
        <div className="main-container">
            <div className="authorise__container">
                <h1 className="authorise__title">Oops, it looks you're not authorised!</h1>  
                <p className="authorise__paragraph">Spotify requires signing in before you can access their API.</p>
                <a href="https://accounts.spotify.com/authorize?client_id=bc785a3e64da41a8a122a4458dc4afc3&response_type=token&redirect_uri=http:%2F%2Flocalhost:8080&show_dialog=false&scope=playlist-read-private,playlist-read-collaborative,user-follow-read,user-library-read,user-top-read,user-read-recently-played,user-read-playback-state" className="button">Click here to sign in</a>  
            </div>
        </div>
    );
};

export default SignIn;