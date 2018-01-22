import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import SearchBox from './SearchBox';
import ArtistCollection from './ArtistCollection';

class SearchView extends Component {
    render() {
        return (
            <div> 
                <SearchBox />
                
                    <ArtistCollection 
                        artistArray={this.props.searchResults}
                        accessToken={this.props.accessToken}
                        fetchArtist={this.props.fetchArtist}
                        title='Search Results'
                    />
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchResults: state.searchResults,
        accessToken: state.accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArtist(id, token) {
            dispatch(
                ActionCreators.fetchArtist(id, token)
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);