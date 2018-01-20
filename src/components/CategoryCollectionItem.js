import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryCollectionItem = props => {
    return (
        <div className="album-collection-item">
            <Link to={`/category/${props.categoryID}`} className="album-collection-item__link">
                <img src={props.categoryIcon} alt="" className="album-collection-item__image"></img>
                <p className="album-collection-item__name">{props.categoryName}</p>
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

