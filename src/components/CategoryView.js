import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import PlaylistCollection from './PlaylistCollection';
import Loader from './Loader';

class CategoryView extends Component {

    constructor() {
        super();
        this.getTheCorrectCategory = this.getTheCorrectCategory.bind(this);
    }

    componentDidMount() {
        if (!this.getTheCorrectCategory().categoryPlaylists.length) {
            this.props.fetchCategory(this.props.accessToken, this.props.category);
        }
    }

    getTheCorrectCategory() {
        const categories = this.props.highlights.categories;
        const category = categories[categories.findIndex(elem => elem.categoryID === this.props.category)];
        return category;
    }

    render() {
        const correctCategory = this.getTheCorrectCategory();
        if (!correctCategory.categoryPlaylists.length) {
            return <Loader />;
        }
        return (
            <div className="container">
                <PlaylistCollection 
                    title={correctCategory.categoryName}
                    accessToken={this.props.accessToken}
                    playlistArray={correctCategory.categoryPlaylists}
                />
            </div>
        );  
    }
}


const mapStateToProps = state => ({
    highlights: state.highlights,
    isFetchingHighlights: state.isFetchingHighlights,
    accessToken: state.accessToken.token
});

export default connect(
    mapStateToProps, 
    {fetchCategory: ActionCreators.fetchCategory}
)(CategoryView);