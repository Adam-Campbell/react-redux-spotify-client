import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

import PaginatedPlaylistCollection from './PaginatedPlaylistCollection';
import CategoryCollection from './CategoryCollection';
import NewReleasesCollection from './NewReleasesCollection';
import Loader from './Loader';
import FadeInContainer from './FadeInContainer';



class BrowseView extends Component {

    componentDidMount() {
        if(!this.props.highlights.newReleases.length) {
            this.props.fetchHighlights(this.props.accessToken);
        }
    }

    render() {

        if (this.props.highlights.isFetching) {
            return <Loader />;  
        }
        return (
            <React.Fragment>
                <NewReleasesCollection 
                    newReleasesArray={this.props.highlights.newReleases}
                    title="New Releases"
                    accessToken={this.props.accessToken}
                />

                <PaginatedPlaylistCollection 
                    playlistArray={this.props.highlights.featuredPlaylists}
                    title="Featured Playlists"
                    accessToken={this.props.accessToken}
                />

                <CategoryCollection 
                    categoryArray={this.props.highlights.categories} 
                    title="Categories"
                    accessToken={this.props.accessToken}          
                />
            </React.Fragment> 
        );
    }

}

const mapStateToProps = state => ({
    highlights: state.highlights,
    accessToken: state.accessToken.token,
});

export default connect(
    mapStateToProps,
    {fetchHighlights: ActionCreators.fetchHighlights}
)(BrowseView);
