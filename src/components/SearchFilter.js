import React from 'react';
import PropTypes from 'prop-types';

const SearchFilter = props => {
    return (
        <ul className="search-filter">
                    <li 
                        className={
                            props.showing === 'artists' ?
                            "search-filter__list-item is-active" :
                            "search-filter__list-item"
                        }
                    >
                        <a href="#" className="search-filter__link" onClick={props.switchToArtists}>Artists</a>
                    </li>
                    <li 
                        className={
                            props.showing === 'albums' ?
                            "search-filter__list-item is-active" :
                            "search-filter__list-item"
                        }
                    >
                        <a href="#" className="search-filter__link" onClick={props.switchToAlbums}>Albums</a>
                    </li>
                    <li 
                        className={
                            props.showing === 'playlists' ?
                            "search-filter__list-item is-active" :
                            "search-filter__list-item"
                        }
                    >
                        <a href="#" className="search-filter__link" onClick={props.switchToPlaylists}>Playlists</a>
                    </li>
                </ul>
    )
}

SearchFilter.propTypes = {
    showing: PropTypes.string.isRequired,
    switchToArtists: PropTypes.func.isRequired,
    switchToAlbums: PropTypes.func.isRequired,
    switchToPlaylists: PropTypes.func.isRequired
};

export default SearchFilter;