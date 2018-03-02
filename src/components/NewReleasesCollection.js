import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Paginator from './Paginator';
import SlideInContainer from './SlideInContainer';
import { imageSizePicker } from '../imageSizePicker';
import withPagination from './withPagination';
import withSlideIn from './withSlideIn';


const NewReleasesCollection = props => {

    const upperBound = props.currentPage * 10;
    const lowerBound = upperBound - 10;

    return (
        <section className="card-collection">
            <h1 className="heading heading--regular">{props.title}</h1>
            <div className="card-collection__container">
                {props.newReleasesArray.slice(lowerBound, upperBound).map((release, index) => (
                    <Card
                        cardTitle={release.albumName}
                        cardImage={imageSizePicker(release.albumImage, 250, 250)}
                        cardDestination={`/album/${release.albumID}`}
                        isRounded={false}
                        key={index}
                    >
                        <p className="card__text--small">{release.artistName}</p>
                    </Card>
                ))}
            </div>
            <Paginator 
                totalItems={props.newReleasesArray.length}
                itemsPerPage={10}
                currentPage={props.currentPage}
                setPage={props.setPage}
            />
        </section>
    );
}














// class NewReleasesCollection extends Component {

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
//                     {this.props.newReleasesArray.slice(lowerBound, upperBound).map((release, index) => (
//                         <Card
//                             cardTitle={release.albumName}
//                             cardImage={imageSizePicker(release.albumImage, 250, 250)}
//                             cardDestination={`/album/${release.albumID}`}
//                             isRounded={false}
//                             key={index}
//                         >
//                             <p className="card__text--small">{release.artistName}</p>
//                         </Card>
//                     ))}
//                 </div>
//                 <Paginator 
//                     totalItems={this.props.newReleasesArray.length}
//                     itemsPerPage={10}
//                     currentPage={this.state.currentPage}
//                     setPage={this.setPage}
//                 />
//             </section>
//         );
//     }
// }

NewReleasesCollection.propTypes = {
    newReleasesArray: PropTypes.array,
    title: PropTypes.string,
    accessToken: PropTypes.string
}

export default withPagination(NewReleasesCollection);
