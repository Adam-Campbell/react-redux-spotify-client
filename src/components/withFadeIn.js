import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { CSSTransition } from 'react-transition-group';


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




// const withFadeIn = Component => {
//     return class extends React.Component {

//         constructor(props) {
//             super(props);
//             this.state = {
//                 showing: false
//             };
//             setTimeout(() => {
//                 this.setState({showing: true});
//             });
//         }


//         onEnter() {
//             console.log('onEnter was fired');
//         }

//         onEntering() {
//             console.log('onEntering was fired');
//         }

//         onEntered() {
//             console.log('onEntered was fired');
//         }

//         render() {
//             return (
//                 <CSSTransition
//                     appear={true}
//                     timeout={1500}
//                     classNames="fade-in"
//                     component="div"
//                     in={this.state.showing}
//                 >
//                     <Component {...this.props} />
//                 </CSSTransition>
//             )
//         }
//     }
// }


// const withFadeIn = Component => props => ( 
//     <CSSTransition
//         appear={true}
//         timeout={1500}
//         classNames="fade-in"
//         component="div"
//     >
//         <Component {...props} />
//     </CSSTransition>
// );


// const withFadeIn = Component => props => ( 
//     <ReactCSSTransitionGroup
//         transitionAppear={true}
//         transitionAppearTimeout={1500}
//         transitionEnterTimeout={600}
//         transitionLeaveTimeout={200}
//         transitionName="fade-in"
//         component="div"
//     >
//         <Component {...props} />
//     </ReactCSSTransitionGroup>
// );

export default withFadeIn;