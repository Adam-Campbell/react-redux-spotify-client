import React from 'react';
import PropTypes from 'prop-types';
import ArtistCollection from './ArtistCollection';
import AlbumCollection from './AlbumCollection';
import PlaylistCollection from './PlaylistCollection';


const SearchResults = props => {
    if (props.showing === 'artists') {
        return <ArtistCollection artistArray={props.searchResults.artists} title='Artists' />;
    } else if (props.showing === 'albums') {
        return <AlbumCollection albumArray={props.searchResults.albums} title="Albums" />;
    }
    return <PlaylistCollection playlistArray={props.searchResults.playlists} title="Playlists" />;
};

SearchResults.propTypes = {
    showing: PropTypes.string,
    searchResults: PropTypes.object
};

export default SearchResults;