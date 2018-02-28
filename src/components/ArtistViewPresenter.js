import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import ArtistHeader from './ArtistHeader';
import InlineNav from './InlineNav';
import AlbumsView from './AlbumsView';
import RelatedArtistsView from './RelatedArtistsView';
import ArtistOverview from './ArtistOverview';
import withFadeIn from './withFadeIn';

const ArtistViewPresenter = props => {


    return (
        <div>
            <ArtistHeader 
                artistImage={props.artist.artistImage}
                artistName={props.artist.artistName}
                genres={props.artist.genres}
            />

            <InlineNav 
                currentArtist={props.artistID}
            />
            <Switch>

                <Route 
                    path={`${props.url}/albums`}
                    render={() => <AlbumsView artist={props.artist} />}
                />

                <Route 
                    path={`${props.url}/related-artists`}
                    render={() => <RelatedArtistsView artist={props.artist} />}
                />

                <Route 
                    path={`${props.url}/overview`} 
                    render={() => <ArtistOverview 
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

export default withFadeIn(ArtistViewPresenter)
