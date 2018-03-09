import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Collection from './Collection';
import { imageSizePicker } from '../helpers';

const CategoryCollection = props => (
    <Collection 
        title={props.title}
        itemArray={props.categoryArray.map((category, index) => (
            <Card 
                cardImage={imageSizePicker(category.categoryIcon, 250, 250)}
                cardTitle={category.categoryName}
                cardDestination={`/category/${category.categoryID}`}
                isRounded={false}
                isArtist={false}
                key={category.categoryID}
            />
        ))}
    />
);

CategoryCollection.propTypes = {
    categoryArray: PropTypes.array,
    title: PropTypes.string,
    accessToken: PropTypes.string
}

export default CategoryCollection;