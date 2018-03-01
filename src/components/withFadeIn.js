import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const withFadeIn = Component => props => ( 
    <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={1500}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName="fade-in"
        component="div"
    >
        <Component {...props} />
    </ReactCSSTransitionGroup>
);

export default withFadeIn;