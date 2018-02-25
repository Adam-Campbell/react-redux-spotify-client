import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Collection from './Collection';

const PlaylistCollection = props => (
    <Collection 
        title={props.title}
        itemArray={props.playlistArray.map((playlist, index) => (
            <Card 
                cardImage={playlist.playlistImage}
                cardTitle={playlist.playlistName}
                isRounded={false}
                cardDestination={`/playlist/${playlist.ownerID}/${playlist.playlistID}`}
                key={index}
            />
        ))}
    >
        {props.children}
    </Collection>
);

PlaylistCollection.propTypes = {
    playlistArray: PropTypes.array,
    title: PropTypes.string,
    accessToken: PropTypes.string
};

export default PlaylistCollection;