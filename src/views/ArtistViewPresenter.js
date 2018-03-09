import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ArtistHeader from '../components/ArtistHeader';
import InlineNav from '../components/InlineNav';
import FollowerCountAndStatus from '../components/FollowerCountAndStatus';
import ArtistMusicSubView from './ArtistMusicSubView';
import ArtistRelatedArtistsSubView from './ArtistRelatedArtistsSubView';
import ArtistOverviewSubView from './ArtistOverviewSubView';

const ArtistViewPresenter = props => {

    return (
        <div className="fade-into-view">
            <ArtistHeader 
                artistImage={props.artist.artistImage[0].url}
                artistName={props.artist.artistName}
                genres={props.artist.genres}
            />

            <FollowerCountAndStatus 
                followerCount={props.artist.followers}
                isFollowing={props.artist.isFollowing}
                shouldShowButton={true}
                shouldCenter={true}
                follow={() => props.followArtist(props.artistID, props.accessToken)}
                unfollow={() => props.unfollowArtist(props.artistID, props.accessToken)}
            />

            <InlineNav 
                currentArtist={props.artistID}
            />
            <Switch>
                <Route 
                    path={`${props.url}/music`}
                    render={() => <ArtistMusicSubView artist={props.artist} />}
                />

                <Route 
                    path={`${props.url}/related-artists`}
                    render={() => <ArtistRelatedArtistsSubView artist={props.artist} />}
                />

                <Route 
                    path={`${props.url}/overview`} 
                    render={() => <ArtistOverviewSubView 
                                        artist={props.artist}
                                        playPauseTrack={props.playPauseTrack}
                                        currentlySelectedCollection={props.currentlySelectedCollection}
                                    />
                    }
                />

                <Route 
                    path={'/'}
                    render={() => <Redirect to={`${props.url}/overview`}/>}
                />
                
            </Switch>
        </div>
    );
}; 

ArtistViewPresenter.propTypes = {
    artist: PropTypes.object,
    artistID: PropTypes.string,
    url: PropTypes.string,
    playPauseTrack: PropTypes.func,
    currentlySelectedCollection: PropTypes.object
};

export default ArtistViewPresenter;
