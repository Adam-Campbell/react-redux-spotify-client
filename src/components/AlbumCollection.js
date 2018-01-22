import React from 'react';
import PropTypes from 'prop-types';
import AlbumCollectionItem from './AlbumCollectionItem';

const AlbumCollection = props => {
    return (
        <section className="card-collection">
            <h1 className="heading heading--regular">{props.title}</h1>
            <div className="card-collection__container">
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