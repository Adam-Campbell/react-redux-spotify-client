import React from 'react';
import PropTypes from 'prop-types';
import ArtistCollectionItem from './ArtistCollectionItem';

//
//  This component is used in different contexts, and different contexts require differently
//  sized artist collections to be rendered. Since this component is 'dumb', always resize the  
//  artistArray prop to the correct size before being passed to this component, via the .slice() method.
//
//

const ArtistCollection = props => {

    let artistArr;
    if (props.artistArray.length) {
        artistArr = props.artistArray.map(artist => {
            return (
                <ArtistCollectionItem
                    artistName={artist.artistName}
                    artistImage={artist.artistImage}
                    artistID={artist.artistID}
                    key={artist.artistID}
                />
            )
        });
    } else {
        artistArr = <p>Sorry, there are no artists to show here.</p>
    }

    return (
        <section className="card-collection">
                <h1 className="heading heading--regular">{props.title}</h1>
                <div className="card-collection__container">
                    {artistArr}
                </div>
        </section>
    );
}

ArtistCollection.propTypes = {
    artistArray: PropTypes.array,
    title: PropTypes.string
};

export default ArtistCollection;