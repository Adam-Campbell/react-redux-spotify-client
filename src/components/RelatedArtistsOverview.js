import React from 'react';
import PropTypes from 'prop-types';
import ArtistCard from './ArtistCard';

const RelatedArtistsOverview = props => {
    return (
        <section className="top-related">
            <h3 className="top-related__title">Related Artists</h3>
            <div className="top-related__container">
                {
                    props.relatedArtists.map(artist => {
                        return (
                            <ArtistCard 
                                name={artist.name}
                                image={artist.image}
                                id={artist.id}
                                key={artist.id}
                            />
                        )
                    })
                }
            </div>
        </section>
    );
}

RelatedArtistsOverview.propTypes = {
    relatedArtists: PropTypes.array
};

export default RelatedArtistsOverview;