import React from 'react';
import PropTypes from 'prop-types';
import PlaylistCollection from '../components/PlaylistCollection';

const CategoryViewPresenter = props => (
    <div className="fade-into-view">
        <PlaylistCollection 
            title={props.title}
            playlistArray={props.playlistArray}
        />
    </div>
);

CategoryViewPresenter.propTypes = {
    title: PropTypes.string,
    playlistArray: PropTypes.array
};

export default CategoryViewPresenter;