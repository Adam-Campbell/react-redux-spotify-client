import React from 'react';
import PropTypes from 'prop-types';
import withFadeIn from './withFadeIn';
import PaginatedPlaylistCollection from './PaginatedPlaylistCollection';
import CategoryCollection from './CategoryCollection';
import NewReleasesCollection from './NewReleasesCollection';

const BrowseViewPresenter = props => (
    <React.Fragment>
        <NewReleasesCollection 
            newReleasesArray={props.newReleases}
            title="New Releases"
        />

        <PaginatedPlaylistCollection 
            playlistArray={props.featuredPlaylists}
            title="Featured Playlists"
        />

        <CategoryCollection 
            categoryArray={props.categories} 
            title="Categories"         
        />
    </React.Fragment>
);

BrowseViewPresenter.propTypes = {
    newReleases: PropTypes.array,
    featuredPlaylists: PropTypes.array,
    categories: PropTypes.array
};

export default withFadeIn(BrowseViewPresenter);