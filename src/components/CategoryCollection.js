import React from 'react';
import PropTypes from 'prop-types';
import CategoryCollectionItem from './CategoryCollectionItem';

const CategoryCollection = props => {
    //console.log(props.categoryArray);
    return (
        <section className="album-collection">
            <h2 className="album-collection__title">{props.title}</h2>
            <div className="album-collection__container">
                {
                    props.categoryArray.map(category => {
                        return (
                            <CategoryCollectionItem 
                                categoryIcon={category.categoryIcon}
                                categoryName={category.categoryName}
                                categoryID={category.categoryID}
                                key={category.categoryID}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}

CategoryCollection.propTypes = {
    categoryArray: PropTypes.array,
    title: PropTypes.string,
    accessToken: PropTypes.string
}

export default CategoryCollection;