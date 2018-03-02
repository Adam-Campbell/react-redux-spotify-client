import React from 'react';
import PropTypes from 'prop-types';
import PlaylistCollection from './PlaylistCollection';
import withFadeIn from './withFadeIn';

const CategoryViewPresenter = props => (
    <PlaylistCollection 
        title={props.title}
        playlistArray={props.playlistArray}
    />
);

CategoryViewPresenter.propTypes = {
    title: PropTypes.string,
    playlistArray: PropTypes.array
};

export default withFadeIn(CategoryViewPresenter);