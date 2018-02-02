import React from 'react';
import PropTypes from 'prop-types';
import ArtistCollection from './ArtistCollection';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const RelatedArtistsView = props => {
    return (
        <ReactCSSTransitionGroup
            component="div"
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionAppear={true}
            transitionAppearTimeout={500}
        >
            <ArtistCollection 
                artistArray={props.artist.relatedArtists}
                title='Related Artists'
            />
        </ReactCSSTransitionGroup>
    );
}

RelatedArtistsView.propTypes = {
    artist: PropTypes.object
}


export default RelatedArtistsView;
