import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// const withFadeIn = Component => props => ( 
//     <ReactCSSTransitionGroup
//         transitionAppear={true}
//         transitionAppearTimeout={600}
//         transitionEnterTimeout={600}
//         transitionLeaveTimeout={200}
//         transitionName="FadeIn"
//         className="page-full"
//         component="div"
//     >
//         <Component {...props} />
//     </ReactCSSTransitionGroup>
// );

// export default withFadeIn;


// const FadeInContainer = props => (
//     <CSSTransition
//         classNames="fade"
//         appear={true}
//         timeout={5000}
//         in={false}
//     >
//         {props.children} 
//     </CSSTransition>
// );

class FadeInContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            in: false
        }
    }

    componentDidMount() {
        this.setState({in: true});
    }

    render() {
        return (
            <CSSTransition 
                classNames="fade"
                appear={true}
                timeout={600}
                in={this.state.in}
            >
                {this.props.children}
            </CSSTransition>
        );
    }
}



//import { CSSTransitionGroup } from 'react-transition-group';

// const FadeInContainer = props => (
//     <CSSTransitionGroup
//         component="div"
//         transitionName="fade"
//         transitionAppear={true}
//         transitionAppearTimeout={500}
//         transitionEnterTimeout={500}
//         transitionLeaveTimeout={500}
//     >
//         {props.children}
//     </CSSTransitionGroup>
// );

// class FadeInContainer extends Component {

//     constructor(props) {
//         super(props);
//         this.showComponent = this.showComponent.bind(this);
//         this.state = {
//             fadeClass: 'fade-pre',
//         };
//     }

//     componentDidMount() {
//         // setTimeout(() => {
//         //     this.setState({fadeClass: 'fade-pre fade-post'});
//         // }, 500); 
//         this.showComponent();
//     }

//     showComponent() {
//         setTimeout(() => {
//             this.setState({fadeClass: 'fade-pre fade-post'});
//         }, 250);
//     }

//     render() {
//         return (
//             <div className={this.state.fadeClass}>
//                 {this.props.children}
//             </div>
//         );
//     }
// }


export default FadeInContainer;


//transitionEnterTimeout={500}
//transitionLeaveTimeout={500}
