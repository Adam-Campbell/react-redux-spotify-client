import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';
import withFadeIn from './withFadeIn';

const SearchViewPresenter = props => (
    <div className="fade-into-view">
        <SearchBox />

        <SearchFilter 
            showing={props.showing}
            switchToArtists={props.switchToArtists}
            switchToAlbums={props.switchToAlbums}
            switchToPlaylists={props.switchToPlaylists}
        />
        
        <SearchResults 
            showing={props.showing} 
            searchResults={props.searchResults} 
        />
    </div>
);

SearchViewPresenter.propTypes = {
    showing: PropTypes.string,
    switchToArtists: PropTypes.func,
    switchToAlbums: PropTypes.func,
    switchToPlaylists: PropTypes.func,
    searchResults: PropTypes.object
};

export default SearchViewPresenter;