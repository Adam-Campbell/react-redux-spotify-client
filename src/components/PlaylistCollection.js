import React from 'react';
import PropTypes from 'prop-types';
import PlaylistCollectionItem from './PlaylistCollectionItem';

const PlaylistCollection = props => {
    return (
        <section className="album-collection">
            <h2 className="album-collection__title">{props.title}</h2>
            <div className="album-collection__container">
                {
                    props.playlistArray.map(playlist => {
                        return (
                            <PlaylistCollectionItem 
                                playlistImage={playlist.playlistImage}
                                playlistName={playlist.playlistName}
                                playlistID={playlist.playlistID}
                                ownerID={playlist.ownerID}
                                key={playlist.playlistID}
                            />
                        )
                    })
                }
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