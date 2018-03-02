import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import BrowseViewPresenter from './BrowseViewPresenter';
import Loader from './Loader';

class BrowseViewContainer extends Component {

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
            <BrowseViewPresenter 
                newReleases={this.props.highlights.newReleases}
                featuredPlaylists={this.props.highlights.featuredPlaylists}
                categories={this.props.highlights.categories}
            />
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
)(BrowseViewContainer);