import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import Loader from '../components/Loader';
import CategoryViewPresenter from './CategoryViewPresenter';


class CategoryViewContainer extends Component {

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
            <CategoryViewPresenter 
                title={correctCategory.categoryName}
                playlistArray={correctCategory.categoryPlaylists}
            />
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
)(CategoryViewContainer);