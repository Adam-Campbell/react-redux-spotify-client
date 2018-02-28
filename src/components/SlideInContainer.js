import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

class SlideInContainer extends Component {
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
                classNames="slide"
                appear={true}
                timeout={500}
                in={this.state.in}
            >
                {this.props.children}
            </CSSTransition>
        );
    }
}

export default SlideInContainer;

