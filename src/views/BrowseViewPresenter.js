import React from 'react';
import PropTypes from 'prop-types';
import NewReleasesCollection from '../components/NewReleasesCollection';
import FeaturedPlaylistsCollection from '../components/FeaturedPlaylistsCollection';
import CategoryCollection from '../components/CategoryCollection';



const BrowseViewPresenter = props => (
    <div className="fade-into-view">

        <NewReleasesCollection 
            itemsArray={props.newReleases}
            itemsPerSlide={10}
            title="New Releases"
        />

        <FeaturedPlaylistsCollection 
            itemsArray={props.featuredPlaylists}
            itemsPerSlide={10}
            title="Featured Playlists"
        />

        <CategoryCollection 
            categoryArray={props.categories} 
            title="Categories"         
        />
    </div>
);

BrowseViewPresenter.propTypes = {
    newReleases: PropTypes.array,
    featuredPlaylists: PropTypes.array,
    categories: PropTypes.array
};

export default BrowseViewPresenter;