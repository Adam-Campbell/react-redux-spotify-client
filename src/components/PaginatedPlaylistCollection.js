import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Paginator from './Paginator';
import { imageSizePicker } from '../imageSizePicker';
import withPagination from './withPagination';

const PaginatedPlaylistCollection = props => {

    const upperBound = props.currentPage * 10;
    const lowerBound = upperBound - 10;

    return (
        <section className="card-collection">
            <h1 className="heading heading--regular">{props.title}</h1>
            <div className="card-collection__container">
                {props.playlistArray.slice(lowerBound, upperBound).map((playlist, index) => (
                    <Card 
                        cardImage={imageSizePicker(playlist.playlistImage, 250, 250)}
                        cardTitle={playlist.playlistName}
                        isRounded={false}
                        cardDestination={`/playlist/${playlist.ownerID}/${playlist.playlistID}`}
                        key={index}
                    />
                ))}
            </div>
            <Paginator 
                totalItems={props.playlistArray.length}
                itemsPerPage={10}
                currentPage={props.currentPage}
                setPage={props.setPage}
            />
        </section> 
    );
}





// class PaginatedPlaylistCollection extends Component {

//     constructor(props) {
//         super(props);
//         this.setPage = this.setPage.bind(this);
//         this.state = {currentPage: 1};  
//     }

//     setPage(e, num) {
//         e.preventDefault();
//         this.setState({currentPage: parseInt(num)});
//     }

//     render() {

//         const upperBound = this.state.currentPage * 10;
//         const lowerBound = upperBound - 10;

//         return (
//             <section className="card-collection">
//                 <h1 className="heading heading--regular">{this.props.title}</h1>
//                 <div className="card-collection__container">
//                     {this.props.playlistArray.slice(lowerBound, upperBound).map((playlist, index) => (
//                         <Card 
//                             cardImage={imageSizePicker(playlist.playlistImage, 250, 250)}
//                             cardTitle={playlist.playlistName}
//                             isRounded={false}
//                             cardDestination={`/playlist/${playlist.ownerID}/${playlist.playlistID}`}
//                             key={index}
//                         />
//                     ))}
//                 </div>
//                 <Paginator 
//                     totalItems={this.props.playlistArray.length}
//                     itemsPerPage={10}
//                     currentPage={this.state.currentPage}
//                     setPage={this.setPage}
//                 />
//             </section>
//         )
//     }
// }

PaginatedPlaylistCollection.propTypes = {
    playlistArray: PropTypes.array,
    title: PropTypes.string,
    accessToken: PropTypes.string
};

export default withPagination(PaginatedPlaylistCollection);