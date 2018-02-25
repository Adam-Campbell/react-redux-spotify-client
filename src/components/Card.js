import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowAltCircleRight from '@fortawesome/fontawesome-free-solid/faArrowAltCircleRight';

const Card = props => (
    <div className="card-collection__card-holder">
        <Link to={props.cardDestination} className="card">
            <div className={props.isRounded ? "card__image-outer card__image-outer--rounded" : "card__image-outer"}>
                <div className="card__image-inner" style={{backgroundImage: `url('${props.cardImage}')`}}></div>
                <div className="card__image-overlay">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </div>
            </div>
            <p className="card__text">{props.cardTitle}</p>
            {props.children}
        </Link>
    </div>
);

Card.propTypes = {
    cardDestination: PropTypes.string,
    cardImage: PropTypes.string,
    cardTitle: PropTypes.string,
    isRounded: PropTypes.bool

}

export default Card;