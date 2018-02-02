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
    return (
        <section className="card-collection">
                <h1 className="heading heading--regular">{props.title}</h1>
                <div className="card-collection__container">
                {
                    props.artistArray.map(artist => {
                        return (
                            <ArtistCollectionItem
                                artistName={artist.artistName}
                                artistImage={artist.artistImage}
                                artistID={artist.artistID}
                                key={artist.artistID}
                            />
                        )
                    })
                }
            </div>
        </section>
    );
}

ArtistCollection.propTypes = {
    artistArray: PropTypes.array,
    title: PropTypes.string
};

export default ArtistCollection;