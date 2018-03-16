import React, { Component } from 'react';
// e.touches[0].clientY;

class PlayerVolumeControls extends Component {

    constructor(props) {
        super(props);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    componentDidMount(e) {
        //  Touch events have to be bound directly to the DOM rather than using synthetic
        //  events in order for preventDefault to work. 
        this.knob.addEventListener('touchstart', this.handleTouchStart);
        this.knob.addEventListener('touchmove', this.handleTouchMove);
        this.knob.addEventListener('touchend', this.handleTouchend);
    }

    handleTouchStart(e) {
        e.preventDefault();
        this.props.makeVolumeControlActive(e);
    }

    handleTouchMove(e) {
        this.props.changeVolume(e.touches[0].clientY);
    }

    handleTouchEnd(e) {
        this.props.makeVolumeControlInactive(e);
    }

    handleMouseDown(e) {
        e.preventDefault();
        this.props.makeVolumeControlActive(e);
    }

    render() {
        return (
            <span 
                className="volume-control--outer"
                ref={this.props.volumeControlOuterRef}
                
            >
                    <div 
                        className="volume-control--inner"
                        style={{
                            height: `${this.props.volume}%`
                        }}
                    ></div>
                    <span 
                        className="volume-control--knob"
                        ref={el => this.knob = el}
                        onMouseDown={this.handleMouseDown}
                        style={{
                            bottom: `${this.props.volume}%`
                        }}
                    ></span>
            </span>
        );
    }
}

export default PlayerVolumeControls;









// class PlayerVolumeControls extends Component {

//     constructor(props) {
//         super(props);
//         this.changeVolume = this.changeVolume.bind(this);
//         this.state={
//             volumePercentage: 100
//         };
//     }

//     // This function sets the volume of the track when the user interacts with the volume bar. It is
//     // responsible for the updating of both the track volume as well as the volume bar itself.
//     changeVolume(e) {
//         const { height, top } = this.volumeControlOuter.getBoundingClientRect();
//         const posFromBottom = height - (e.clientY - top);
//         const percent = (posFromBottom * 100) / height;
//         const decimal = percent / 100;
//         this.setState({volumePercentage: percent});
//         this.props.audio.volume = decimal;
//     }

//     render() {
//         return (
//             <div 
//                 className="volume-control--outer"
//                 ref={el => this.volumeControlOuter = el}
//                 onClick={this.changeVolume}
//             >
//                     <div 
//                         className="volume-control--inner"
//                         ref={el => this.volumeControlInner = el}
//                         style={{
//                             height: `${this.state.volumePercentage}%`
//                         }}
//                     ></div>
//             </div>
//         );
//     }
// }

// export default PlayerVolumeControls;