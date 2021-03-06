import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Collection from './Collection';
import { imageSizePicker } from '../helpers';

const PlaylistCollection = props => (
    <Collection 
        title={props.title}
        itemArray={props.playlistArray.map((playlist, index) => (
            <Card 
                cardImage={imageSizePicker(playlist.playlistImage, 250, 250)}
                cardTitle={playlist.playlistName}
                isRounded={false}
                cardDestination={`/playlist/${playlist.ownerID}/${playlist.playlistID}`}
                isArtist={false}
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