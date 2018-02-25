import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Collection from './Collection';

const CategoryCollection = props => (
    <Collection 
        title={props.title}
        itemArray={props.categoryArray.map((category, index) => (
            <Card 
                cardImage={category.categoryIcon}
                cardTitle={category.categoryName}
                cardDestination={`/category/${category.categoryID}`}
                isRounded={false}
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