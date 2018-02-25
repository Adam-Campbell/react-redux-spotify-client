import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const FadeInContainer = props => (
    <ReactCSSTransitionGroup
        component="div"
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
        transitionAppearTimeout={500}
    >
        {props.children}
    </ReactCSSTransitionGroup>
);

export default FadeInContainer;
