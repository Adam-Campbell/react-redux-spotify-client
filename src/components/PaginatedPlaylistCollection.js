import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaylistCollectionItem from './PlaylistCollectionItem';
import Paginator from './Paginator';

class PaginatedPlaylistCollection extends Component {

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

        const upperBound = this.state.currentPage * 10;
        const lowerBound = upperBound - 10;

        return (
            <section className="card-collection">
                <h1 className="heading heading--regular">{this.props.title}</h1>
                <div className="card-collection__container">
                    {
                        this.props.playlistArray.slice(lowerBound, upperBound).map(playlist => {
                            return (
                                <PlaylistCollectionItem 
                                    playlistImage={playlist.playlistImage}
                                    playlistName={playlist.playlistName}
                                    playlistID={playlist.playlistID}
                                    ownerID={playlist.ownerID}
                                    key={playlist.playlistID}
                                />
                            );
                        })
                    }
                </div>
                <Paginator 
                    totalItems={this.props.playlistArray.length}
                    itemsPerPage={10}
                    currentPage={this.state.currentPage}
                    setPage={this.setPage}
                />
            </section>
        )
    }
}

PaginatedPlaylistCollection.propTypes = {
    playlistArray: PropTypes.array,
    title: PropTypes.string,
    accessToken: PropTypes.string
};

export default PaginatedPlaylistCollection;