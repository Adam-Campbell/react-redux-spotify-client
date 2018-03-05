import React from 'react';
import PropTypes from 'prop-types';
import withCarousel from './withCarousel';
import Card from './Card';
import { imageSizePicker } from '../helpers';

const FeaturedPlaylistsCollectionCard = props => (
    <Card 
        cardImage={imageSizePicker(props.item.playlistImage, 250, 250)}
        cardTitle={props.item.playlistName}
        isRounded={false}
        cardDestination={`/playlist/${props.item.ownerID}/${props.item.playlistID}`}
    />
);

FeaturedPlaylistsCollectionCard.propTypes = {
    item: PropTypes.object
};

export default withCarousel(FeaturedPlaylistsCollectionCard);