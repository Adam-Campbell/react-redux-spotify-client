import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import PlaylistCollection from './PlaylistCollection';

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
        if (correctCategory.categoryPlaylists.length) {

            return (
                <div className="container">
                   <PlaylistCollection 
                        title={correctCategory.categoryName}
                        accessToken={this.props.accessToken}
                        playlistArray={correctCategory.categoryPlaylists}
                   />
                </div>
            );
        } else {
            return (
                <p>Still getting the playlists!</p>
            )
        }
        
    }
}


const mapStateToProps = state => {
    return {
        highlights: state.highlights,
        isFetchingHighlights: state.isFetchingHighlights,
        accessToken: state.accessToken.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCategory(token, id) {
            dispatch(
                ActionCreators.fetchCategory(token, id)
            );
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);