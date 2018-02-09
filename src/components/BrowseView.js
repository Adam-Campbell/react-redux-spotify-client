import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

import PaginatedPlaylistCollection from './PaginatedPlaylistCollection';
import CategoryCollection from './CategoryCollection';
import NewReleasesCollection from './NewReleasesCollection';
import Loader from './Loader';

class BrowseView extends Component {

    componentDidMount() {
        if(!this.props.highlights.newReleases.length) {
            this.props.fetchHighlights(this.props.accessToken);
        }
    }

    render() {
        if (this.props.highlights.isFetching) {
            return (
                <Loader />
            );
        } else {
            return (
                <div>
                    <NewReleasesCollection 
                        newReleasesArray={
                                            (this.props.highlights.newReleases) ?
                                            this.props.highlights.newReleases :
                                            []
                                        }
                        title="New Releases"
                        accessToken={this.props.accessToken}
                    />

                    <PaginatedPlaylistCollection 
                        playlistArray={
                                        (this.props.highlights.featuredPlaylists) ? 
                                        this.props.highlights.featuredPlaylists : 
                                        []
                                    }
                        title="Featured Playlists"
                        accessToken={this.props.accessToken}
                    />
                    <CategoryCollection 
                        categoryArray={
                                        (this.props.highlights.categories) ?
                                        this.props.highlights.categories :
                                        []
                                    } 
                        title="Categories"
                        accessToken={this.props.accessToken}          
                    />
                </div>
            )
        }
    }

}



const mapStateToProps = state => {
    return {
        highlights: state.highlights,
        accessToken: state.accessToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchHighlights(token) {
            dispatch(
                ActionCreators.fetchHighlights(token)
            );
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseView);
