import React from 'react';
import PropTypes from 'prop-types';
import UserHeader from '../components/UserHeader';
import InlineTrackCollection from '../components/InlineTrackCollection';
import ArtistCollection from '../components/ArtistCollection';
import PlaylistCollection from '../components/PlaylistCollection';
import CreateNewPlaylistCard from '../components/CreateNewPlaylistCard';

const UserProfileViewPresenter = props => (
    <div className="fade-into-view">
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

export default UserProfileViewPresenter;