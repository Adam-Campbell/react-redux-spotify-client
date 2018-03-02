import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const withSlideIn = Component => props => ( 
    <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName="slide-in"
        component="div"
    >
        <Component {...props} />
    </ReactCSSTransitionGroup>
);

export default withSlideIn;