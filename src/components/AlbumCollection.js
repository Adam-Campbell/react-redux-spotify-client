import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card'
import Collection from './Collection';

const AlbumCollection = props => (
    <Collection 
        title={props.title}
        itemArray={
            props.albumArray.map((album, index) => {
                return (
                    <Card 
                        cardImage={album.albumImage}
                        cardTitle={album.albumName}
                        cardDestination={`/album/${album.albumID}`}
                        isRounded={false}
                        key={index}
                    />
                ); 
            })
        }
    />
);

AlbumCollection.propTypes = {
    albumArray: PropTypes.array,
    title: PropTypes.string,
}

export default AlbumCollection;
