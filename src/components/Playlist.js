import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaylistTracks from './PlaylistTracks';
import Paginator from './Paginator';


class Playlist extends Component {

    constructor(props) {
        super(props);
        this.setPage = this.setPage.bind(this);
        this.state = {currentPage: 1};  
    }

    setPage(e, num) {
        e.preventDefault();
        this.setState({currentPage: parseInt(num)});
    }

    render() {
        return (
            <div>
            <section className="album">
                <div className="album__header">
                    <img src={this.props.playlistImage} alt="" className="album__image"></img>
                    <div className="album__info">
                        <h1 className="heading heading--regular">{this.props.playlistName}</h1>
                        <p className="album__paragraph">A playlist by {this.props.ownerName}</p>
                    </div>
                </div>
                <PlaylistTracks 
                    playlistTracks={this.props.playlistTracks}
                    currentlySelectedCollection={this.props.currentlySelectedCollection}
                    playPauseTrack={this.props.playPauseTrack}
                    currentPage={this.state.currentPage}
                    ownerID={this.props.ownerID}
                    userID={this.props.userID}
                    accessToken={this.props.accessToken}
                />
            </section>
            <Paginator 
                totalItems={this.props.playlistTracks.length}
                itemsPerPage={50}
                currentPage={this.state.currentPage}
                setPage={this.setPage}
            />
            </div>
        );
    }
}


Playlist.propTypes = {
    playlistName: PropTypes.string,
    playlistID: PropTypes.string,
    playlistImage: PropTypes.string,
    ownerID: PropTypes.string,
    ownerName: PropTypes.string,
    playlistTracks: PropTypes.array,
    playPauseTrack: PropTypes.func,
    currentlySelectedCollection: PropTypes.object
}

export default Playlist;
