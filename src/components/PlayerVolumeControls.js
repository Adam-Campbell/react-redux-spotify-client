import React, { Component } from 'react';


class PlayerVolumeControls extends Component {

    constructor(props) {
        super(props);
        this.changeVolume = this.changeVolume.bind(this);
        this.state={
            volumePercentage: 100
        };
    }

    // This function sets the volume of the track when the user interacts with the volume bar. It is
    // responsible for the updating of both the track volume as well as the volume bar itself.
    changeVolume(e) {
        const { height, top } = this.volumeControlOuter.getBoundingClientRect();
        const posFromBottom = height - (e.clientY - top);
        const percent = (posFromBottom * 100) / height;
        const decimal = percent / 100;
        this.setState({volumePercentage: percent});
        this.props.audio.volume = decimal;
    }

    render() {
        return (
            <div 
                className="volume-control--outer"
                ref={el => this.volumeControlOuter = el}
                onClick={this.changeVolume}
            >
                    <div 
                        className="volume-control--inner"
                        ref={el => this.volumeControlInner = el}
                        style={{
                            height: `${this.state.volumePercentage}%`
                        }}
                    ></div>
            </div>
        );
    }
}

export default PlayerVolumeControls;