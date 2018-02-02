import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import ArtistHeader from './ArtistHeader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import ArtistOverview from './ArtistOverview';
import AlbumsView from './AlbumsView';
import RelatedArtistsView from './RelatedArtistsView';
import InlineNav from './InlineNav';
import Loader from './Loader';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class ArtistGroupView extends Component {

    componentDidMount() {
        console.log('component did mount!');
        if (!this.props.artists.artistData.hasOwnProperty(this.props.artistID)) {
            this.props.fetchArtist(this.props.artistID, this.props.accessToken);  
        }
        this.props.switchCurrentArtist(this.props.artistID);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.artistID !== this.props.artistID) {
            this.props.fetchArtist(this.props.artistID, this.props.accessToken);
            this.props.switchCurrentArtist(this.props.artistID);
        }
    }


    render() {
        const artistID = this.props.artistID;
        const url = this.props.url;
        console.log(url);
        console.log(`The artistID is ${artistID}`);

        if (this.props.artists.artistData.hasOwnProperty(artistID)) { 
            const artist = this.props.artists.artistData[artistID];
            return (
                <div>
                    <ArtistHeader 
                        artistImage={artist.artistImage}
                        artistName={artist.artistName}
                        genres={artist.genres}
                    />

                    <InlineNav 
                        currentArtist={artistID}
                    />
                    <Switch>
                        <Route 
                            path={`${url}/albums`}
                            render={
                                () => <AlbumsView 
                                        artist={artist}  
                                    />
                            }
                        />

                        <Route 
                            path={`${url}/related-artists`}
                            render={
                                () => <RelatedArtistsView 
                                        artist={artist}
                                        
                                    />
                            }
                        />

                        <Route 
                            path={`${url}/`} 
                            render={
                                () => <ArtistOverview 
                                        artist={artist}
                                        accessToken={this.props.accessToken}
                                        fetchArtist={this.props.fetchArtist}
                                        playPauseTrack={this.props.playPauseArtistTopTrack}
                                        currentlySelectedCollection={this.props.currentlySelectedCollection}
                                    />
                            } 
                        />
                    </Switch>
                        
                </div>
            );
        } else if (this.props.artists.isFetching) {
            return <Loader />
        } else {
            return null;
        }
    }

}


const mapStateToProps = state => {
    return {
        artists: state.artistInfo,
        accessToken: state.accessToken,
        currentlySelectedCollection: state.currentlySelectedCollection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArtist(id, token) {
            dispatch(
                ActionCreators.fetchArtist(id, token)
            );
        },
        switchCurrentArtist(id) {
            dispatch(
                ActionCreators.switchCurrentArtist(id)
            );
        },
        playPauseArtistTopTrack(trackID, identifier) {
            dispatch(
                ActionCreators.playPauseArtistTopTrack(trackID, identifier)
            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtistGroupView));




// class ArtistGroupView extends Component {

//     render() {
//         if (this.props.isFetchingArtist) {
//             return (
//                 <Loader />
//             )
//         } else if (!this.props.artistInfo.artistID) {
//             return (
//                 <p>Please select an artist using the search screen.</p>
//             )
//         }
//         return (
//             <div>
//                 <ArtistHeader 
//                     artistImage={this.props.artistInfo.artistImage}
//                     artistName={this.props.artistInfo.artistName}
//                     genres={this.props.artistInfo.genres}
//                 />

//                 <InlineNav />
//                         <Switch>
//                             <Route 
//                                 path={`${this.props.match.url}/albums`}
//                                 render={
//                                     () => <AlbumsView 
//                                             artistInfo={this.props.artistInfo}
//                                             accessToken={this.props.accessToken}
//                                             playPauseTrack={this.props.playPauseArtistAlbumTrack}
//                                             currentlySelectedCollection={this.props.currentlySelectedCollection}
//                                         />
//                                 }
//                             />

//                             <Route 
//                                 path={`${this.props.match.url}/related-artists`}
//                                 render={
//                                     () => <RelatedArtistsView 
//                                             artistInfo={this.props.artistInfo}
//                                             accessToken={this.props.accessToken}
//                                             fetchArtist={this.props.fetchArtist}
//                                         />
//                                 }
//                             />

//                             <Route 
//                                 path={`${this.props.match.url}/album/:albumID`}
//                                 render={({match}) => <SingularAlbum 
//                                                         albumID={match.params.albumID}
//                                                         artistInfo={this.props.artistInfo}
//                                                         accessToken={this.props.accessToken}
//                                                         playPauseTrack={this.props.playPauseArtistAlbumTrack}
//                                                         currentlySelectedCollection={this.props.currentlySelectedCollection}
//                                                     />
//                                                 }
//                             />

//                             <Route 
//                                 path={`${this.props.match.url}/`} 
//                                 render={
//                                     () => <ArtistOverview 
//                                             artistInfo={this.props.artistInfo}
//                                             accessToken={this.props.accessToken}
//                                             fetchArtist={this.props.fetchArtist}
//                                             playPauseTrack={this.props.playPauseArtistTopTrack}
//                                             currentlySelectedCollection={this.props.currentlySelectedCollection}
//                                         />
//                                 } 
//                             />
//                         </Switch>
                    
//             </div>
//         );
//     }

// }


// const mapStateToProps = state => {
//     return {
//         artistInfo: state.artistInfo,
//         isFetchingArtist: state.isFetchingArtist,
//         accessToken: state.accessToken,
//         currentlySelectedCollection: state.currentlySelectedCollection
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchArtist(id, token) {
//             dispatch(
//                 ActionCreators.fetchArtist(id, token)
//             );
//         },
//         playPauseArtistTopTrack(trackID, identifier) {
//             dispatch(
//                 ActionCreators.playPauseArtistTopTrack(trackID, identifier)
//             );
//         },
//         playPauseArtistAlbumTrack(trackID, identifier) {
//             dispatch(
//                 ActionCreators.playPauseArtistAlbumTrack(trackID, identifier)
//             );
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ArtistGroupView);