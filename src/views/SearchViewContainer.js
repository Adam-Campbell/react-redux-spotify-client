import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import SearchViewPresenter from './SearchViewPresenter';

class SearchViewContainer extends Component {

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
                <SearchViewPresenter 
                    showing={this.state.showing}
                    switchToArtists={this.switchToArtists}
                    switchToAlbums={this.switchToAlbums}
                    switchToPlaylists={this.switchToPlaylists}
                    searchResults={this.props.searchResults}
                />     
        );
    }
}

const mapStateToProps = state => ({
    searchResults: state.searchResults.results
});

export default connect(
    mapStateToProps, 
    {fetchArtist: ActionCreators.fetchArtist}
)(SearchViewContainer);