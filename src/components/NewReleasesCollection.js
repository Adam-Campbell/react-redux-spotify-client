import React from 'react';
import PropTypes from 'prop-types';
import withCarousel from './withCarousel';
import Card from './Card';
import { imageSizePicker } from '../helpers';

const NewReleasesCollectionCard = props => (
    <Card
        cardTitle={props.item.albumName}
        cardImage={imageSizePicker(props.item.albumImage, 250, 250)}
        cardDestination={`/album/${props.item.albumID}`}
        isRounded={false}
        isArtist={false}
    >
        <p className="card__text--small">{props.item.artistName}</p>
    </Card>
);


NewReleasesCollectionCard.propTypes = {
    item: PropTypes.object
};

export default withCarousel(NewReleasesCollectionCard);