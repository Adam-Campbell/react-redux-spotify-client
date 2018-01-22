import React from 'react';
import PropTypes from 'prop-types';
import CategoryCollectionItem from './CategoryCollectionItem';

const CategoryCollection = props => {
    
    return (
        <section className="card-collection">
            <h1 className="heading heading--regular">{props.title}</h1>
            <div className="card-collection__container">
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