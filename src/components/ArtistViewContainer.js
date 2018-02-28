import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import Loader from './Loader';
import ArtistViewPresenter from './ArtistViewPresenter';
import { withRouter } from 'react-router';

class ArtistViewContainer extends Component {

    componentDidMount() {
        if (!this.props.artists.artistData.hasOwnProperty(this.props.artistID)) {
            this.props.fetchArtist(this.props.artistID, this.props.accessToken);  
        }
        this.props.switchCurrentArtist(this.props.artistID);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.artistID !== this.props.artistID) {
            this.props.fetchArtist(this.props.artistID, this.props.accessToken);
            this.props.switchCurrentArtist(this.props.artistID);
        }
    }


    render() {

        const {artistID, url} = this.props;
        
        if (this.props.artists.artistData.hasOwnProperty(artistID)) { 
            const artist = this.props.artists.artistData[artistID];
            return (
                <ArtistViewPresenter 
                    artist={artist}
                    artistID={artistID}
                    url={url}
                    playPauseTrack={this.props.playPauseArtistTopTrack}
                    currentlySelectedCollection={this.props.currentlySelectedCollection}
                />    
            );
        } else if (this.props.artists.isFetching) {
            return <Loader />
        }
        return null;
    }

}


const mapStateToProps = state => ({
    artists: state.artistInfo,
    accessToken: state.accessToken.token,
    currentlySelectedCollection: state.currentlySelectedCollection
});


export default withRouter(connect(
    mapStateToProps, 
    {
        fetchArtist: ActionCreators.fetchArtist,
        switchCurrentArtist: ActionCreators.switchCurrentArtist,
        playPauseArtistTopTrack: ActionCreators.playPauseArtistTopTrack
    }
)(ArtistViewContainer));