import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card'

const Collection = props => (
    <section className="card-collection">
        <h1 className="heading heading--regular">{props.title}</h1>
        <div className="card-collection__container">
            {props.children}
            {
                props.itemArray.length ? 
                props.itemArray : 
                <p>Sorry, there is nothing to show here.</p>
            }
        </div>
        {props.button}
    </section>
);


Collection.propTypes = {
    itemArray: PropTypes.array,
    title: PropTypes.string,
    button: PropTypes.element
};

export default Collection;