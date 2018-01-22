import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowAltCircleRight from '@fortawesome/fontawesome-free-solid/faArrowAltCircleRight';

const CategoryCollectionItem = props => {
    return (
        <div className="card-collection__card-holder">
            <Link 
                to={`/category/${props.categoryID}`}
                className="card"
            >
                <div className="card__image-outer">
                    <div className="card__image-inner" style={{backgroundImage: `url('${props.categoryIcon}')`}}></div>
                    <div className="card__image-overlay">
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </div>
                </div>
                <p className="card__text">{props.categoryName}</p>
            </Link>
        </div>
    );
}


CategoryCollectionItem.propTypes = {
    categoryIcon: PropTypes.string,
    cagtegoryName: PropTypes.string,
    categoryID: PropTypes.string
}

export default CategoryCollectionItem;

