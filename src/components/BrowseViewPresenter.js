import React from 'react';
import PropTypes from 'prop-types';
import withFadeIn from './withFadeIn';
import PaginatedPlaylistCollection from './PaginatedPlaylistCollection';
import CategoryCollection from './CategoryCollection';
import NewReleasesCollection from './NewReleasesCollection';
import Carousel from './Carousel';
import NewReleasesCollectionWithCarousel from './NewReleasesCollectionWithCarousel';
import FeaturedPlaylistsCollectionWithCarousel from './FeaturedPlaylistsCollectionWithCarousel';



const BrowseViewPresenter = props => (
    <div className="fade-into-view">

        <NewReleasesCollectionWithCarousel 
            itemsArray={props.newReleases}
            itemsPerSlide={10}
            title="New Releases"
        />

        <FeaturedPlaylistsCollectionWithCarousel 
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