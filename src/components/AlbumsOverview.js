import React from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

const AlbumsOverview = props => {
    return (
        <section className="recent-albums">
            <h2 className="recent-albums__title">Albums</h2>
            <div className="recent-albums__container">
                {
                    props.albums.map(album => {
                        return (
                            <AlbumCard 
                                image={album.image}
                                name={album.name}
                                id={album.id}
                                key={album.id}
                            />
                        );
                    })
                }
            </div>
        </section>
    );
}

AlbumsOverview.propTypes = {
    albums: PropTypes.array
};

export default AlbumsOverview;
