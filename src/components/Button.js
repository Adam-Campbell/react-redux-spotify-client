import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = props => (
    <div className="button__container">
        <Link
            className="button button--push-down"
            to={props.linkTo}
        >
            {props.anchorText}
        </Link>
    </div>
);

Button.propTypes = {
    linkTo: PropTypes.string,
    anchorText: PropTypes.string
}

export default Button;