import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Collection from './Collection';

const ArtistCollection = props => (
    <Collection 
        title={props.title}
        itemArray={props.artistArray.map((artist, index) => (
            <Card 
                cardImage={artist.artistImage}
                cardTitle={artist.artistName}
                cardDestination={`/artist/${artist.artistID}/`}
                isRounded={true}
                key={index}
            />
        ))}
        button={props.children}
    />
);

ArtistCollection.propTypes = {
    artistArray: PropTypes.array,
    title: PropTypes.string
};

export default ArtistCollection;