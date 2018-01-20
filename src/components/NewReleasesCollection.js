import React from 'react';
import PropTypes from 'prop-types';
import NewReleasesCollectionItem from './NewReleasesCollectionItem';

const NewReleasesCollection = props => {
    return (
        <section className="album-collection">
            <h2 className="album-collection__title">{props.title}</h2>
            <div className="album-collection__container">
                {
                    props.newReleasesArray.map(release => {
                        return (
                            <NewReleasesCollectionItem 
                                albumName={release.albumName}
                                albumID={release.albumID}
                                key={release.albumID}
                                albumImage={release.albumImage}
                                artistName={release.artistName}
                                artistID={release.artistID}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}

NewReleasesCollection.propTypes = {
    newReleasesArray: PropTypes.array,
    title: PropTypes.string,
    accessToken: PropTypes.string
}

export default NewReleasesCollection;