import React from 'react';
import PropTypes from 'prop-types';
import AlbumCollectionItem from './AlbumCollectionItem';

const AlbumCollection = props => {
    return (
        <section className="album-collection">
            <h2 className="album-collection__title">{props.title}</h2>
            <div className="album-collection__container">
                {
                    props.albumArray.map(album => {
                        return (
                            <AlbumCollectionItem 
                                albumImage={album.albumImage}
                                albumName={album.albumName}
                                albumID={album.albumID}
                                key={album.albumID}
                                accessToken={props.accessToken}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}

AlbumCollection.propTypes = {
    albumArray: PropTypes.array,
    title: PropTypes.string,
    accessToken: PropTypes.string
}

export default AlbumCollection;