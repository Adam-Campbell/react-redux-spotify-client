import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

import PlaylistCollection from './PlaylistCollection';
import CategoryCollection from './CategoryCollection';
import NewReleasesCollection from './NewReleasesCollection';
import Loader from './Loader';

class BrowseView extends Component {

    componentDidMount() {
        if(!this.props.highlights.newReleases) {
            this.props.fetchHighlights(this.props.accessToken);
        }
    }

    render() {
        if (this.props.isFetchingHighlights) {
            return (
                <Loader />
            );
        } else {
            return (
                <div>
                    <NewReleasesCollection 
                        newReleasesArray={
                                            (this.props.highlights.newReleases) ?
                                            this.props.highlights.newReleases.slice(0,10) :
                                            []
                                        }
                        title="New Releases"
                        accessToken={this.props.accessToken}
                    />

                    <PlaylistCollection 
                        playlistArray={
                                        (this.props.highlights.featuredPlaylists) ? 
                                        this.props.highlights.featuredPlaylists.slice(0,10) : 
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
        isFetchingHighlights: state.isFetchingHighlights,
        accessToken: state.accessToken.token,
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
