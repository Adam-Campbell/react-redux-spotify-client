import React from 'react';
import PropTypes from 'prop-types';
import withFadeIn from './withFadeIn';
import UserHeader from './UserHeader';
import InlineTrackCollection from './InlineTrackCollection';
import ArtistCollection from './ArtistCollection';
import PlaylistCollection from './PlaylistCollection';
import CreateNewPlaylistCard from './CreateNewPlaylistCard';

const UserProfileViewPresenter = props => (
    <div>
        <UserHeader 
            userName={props.userInfo.userName}
            userImage={props.userInfo.userImage}
        />
        <InlineTrackCollection 
            trackArray={props.userInfo.recentTracks}
            title="Recently Played Tracks"
            playPauseTrack={props.playPauseTrack}
            currentlySelectedCollection={props.currentlySelectedCollection}
        />
        <ArtistCollection 
            artistArray={props.userInfo.topArtists}
            title="Your Top Artists"
        />
        <PlaylistCollection 
            playlistArray={props.userInfo.playlists}
            title="Your Playlists"
        >
            <CreateNewPlaylistCard />
        </PlaylistCollection>
    </div>
);

export default withFadeIn(UserProfileViewPresenter);