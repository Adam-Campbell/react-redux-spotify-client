import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from '../components/SearchBox';
import SearchFilter from '../components/SearchFilter';
import SearchResults from '../components/SearchResults';

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