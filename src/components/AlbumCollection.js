import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card'
import Collection from './Collection';
import { imageSizePicker } from '../helpers';

const AlbumCollection = props => (
    <Collection 
        title={props.title}
        itemArray={
            props.albumArray.map((album, index) => {
                return (
                    <Card 
                        cardImage={imageSizePicker(album.albumImage, 250, 250)}
                        cardTitle={album.albumName}
                        cardDestination={`/album/${album.albumID}`}
                        isRounded={false}
                        isArtist={false}
                        key={index}
                    />
                ); 
            })
        }
        button={props.children}
    />
);

AlbumCollection.propTypes = {
    albumArray: PropTypes.array,
    title: PropTypes.string,
}

export default AlbumCollection;
