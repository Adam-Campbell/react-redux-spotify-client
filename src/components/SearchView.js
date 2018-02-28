import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import SearchBox from './SearchBox';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';
import FadeInContainer from './FadeInContainer';

class SearchView extends Component {

    constructor(props) {
        super(props);
        this.switchToArtists = this.switchToArtists.bind(this);
        this.switchToAlbums = this.switchToAlbums.bind(this);
        this.switchToPlaylists = this.switchToPlaylists.bind(this);
        this.state = {showing: 'artists'};
    }

    switchToArtists(e) {
        e.preventDefault();
        this.setState({showing: 'artists'});
    }

    switchToAlbums(e) {
        e.preventDefault();
        this.setState({showing: 'albums'});
    }

    switchToPlaylists(e) {
        e.preventDefault();
        this.setState({showing: 'playlists'});
    }

    render() {

        return ( 
                <div>
                    <SearchBox />

                    <SearchFilter 
                        showing={this.state.showing}
                        switchToArtists={this.switchToArtists}
                        switchToAlbums={this.switchToAlbums}
                        switchToPlaylists={this.switchToPlaylists}
                    />
                    
                    <SearchResults 
                        showing={this.state.showing} 
                        searchResults={this.props.searchResults} 
                    />
                </div>
        );
    }
}

const mapStateToProps = state => ({
    searchResults: state.searchResults.results,
    accessToken: state.accessToken.token
});

export default connect(
    mapStateToProps, 
    {fetchArtist: ActionCreators.fetchArtist}
)(SearchView);