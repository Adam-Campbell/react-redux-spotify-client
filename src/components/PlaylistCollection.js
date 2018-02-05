import React from 'react';
import PropTypes from 'prop-types';
import PlaylistCollectionItem from './PlaylistCollectionItem';

const PlaylistCollection = props => {

    let playlistArr;
    if (props.playlistArray.length) {
        playlistArr = props.playlistArray.map(playlist => {
            return (
                <PlaylistCollectionItem 
                    playlistImage={playlist.playlistImage}
                    playlistName={playlist.playlistName}
                    playlistID={playlist.playlistID}
                    ownerID={playlist.ownerID}
                    key={playlist.playlistID}
                />
            )
        });
    } else {
        playlistArr = <p>Sorry, there are no playlists to show here.</p>
    }

    return (
        <section className="card-collection">
            <h1 className="heading heading--regular">{props.title}</h1>
            <div className="card-collection__container">
                {playlistArr}
            </div>
        </section>
    )
}

PlaylistCollection.propTypes = {
    playlistArray: PropTypes.array,
    title: PropTypes.string,
    accessToken: PropTypes.string
}

export default PlaylistCollection;