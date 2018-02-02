import * as ActionTypes from '../actiontypes';
import { convertMsToMinSec, fetchWrapper } from './helpers';


//
// Exported thunk action
//

export function fetchArtist(id, token) {
    return async function(dispatch, getState) {
        const currentState =  getState();
        const market = currentState.market;
        dispatch(requestArtist())

        const artistInfo = fetchWrapper(`https://api.spotify.com/v1/artists/${id}`, token);
        const topTracks = fetchWrapper(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=${market}`, token);
        const relatedArtists = fetchWrapper(`https://api.spotify.com/v1/artists/${id}/related-artists`, token);
        const albums = fetchWrapper(`https://api.spotify.com/v1/artists/${id}/albums?album_type=album,single&limit=50&market=${market}`, token);

        const artistInfoComplete = await artistInfo;
        const topTracksComplete = await topTracks;
        const relatedArtistsComplete = await relatedArtists;
        const albumsComplete = await albums;

        const artistObject = {
            artistName: artistInfoComplete.name,
            artistID: artistInfoComplete.id,
            genres: artistInfoComplete.genres,
            followers: artistInfoComplete.followers,
            artistImage: (artistInfoComplete.images.length) ? 
                            artistInfoComplete.images[0].url :
                            '',
            topTracks: createTopTracksArray(topTracksComplete.tracks),
            relatedArtists: createRelatedArtistsArray(relatedArtistsComplete.artists),
            albums: createAlbumsArray(albumsComplete.items)
        };

        dispatch(receiveArtist(artistObject, id))
        
    }
}


//
// Other actions
//

export function switchCurrentArtist(artistID) {
    return {
        type: ActionTypes.SWITCH_CURRENT_ARTIST,
        payload: artistID
    }
}

function requestArtist() {
    return {
        type: ActionTypes.FETCH_ARTIST_REQUEST
    }
}

function receiveArtist(artistObject, artistID) {
    return {
        type: ActionTypes.FETCH_ARTIST_SUCCESS,
        payload: {
            artistObject: artistObject,
            artistID: artistID
        }
    }
}



//
// Helper functions 
//

function createTopTracksArray(data) {
    let arr = [];
    for (let i = 0; i < 5; i++) {
        let track = {
            trackName: data[i].name,
            trackID: `${data[i].id}-topTrack`,
            artistName: data[i].artists[0].name,
            artistID: data[i].artists[0].id,
            albumName: data[i].album.name,
            albumID: data[i].album.id,
            previewURL: data[i].preview_url,
            albumImage: data[i].album.images[1].url,
            duration: convertMsToMinSec(data[i].duration_ms),
            isPlaying: false,
            isCurrentlySelected: false,
            isTopTrack: true,
            //identifier: `${data[i].artists[0].id}-topTracks`
            identifier: data[i].artists[0].id
        }
        arr.push(track);
    }
    return arr;
}

function createRelatedArtistsArray(data) {
    return data.map(artist => {
        return {
            artistName: artist.name,
            artistID: artist.id,
            artistImage: (artist.images.length) ? artist.images[0].url : ''
        }
    })
}

function transformIDsToList(data) {
    return data.filter(album => album.available_markets.includes('GB'))
    .map(album => album.id)
    .join(',')
}


function createAlbumsArray(data) {
    return data.map(album => {
        return {
            albumName: album.name,
            albumID: album.id,
            albumType: album.album_type,
            albumImage: (album.images.length) ? album.images[0].url : '',
            artistName: album.artists[0].name,
            artistID: album.artists[0].id
        }
    })
}

// function createAlbumsArray(data) {
//     return data.map(album => {
//         let artistName = album.artists[0].name;
//         let artistID = album.artists[0].id;
//         let albumName = album.name;
//         let albumID = album.id;
//         return {
//             albumID: albumID,
//             albumName: albumName,
//             artistName: artistName,
//             artistID: artistID,
//             releaseDate: album.release_date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1'),
//             albumImage: (album.images.length) ? album.images[0].url : '',
//             albumTracks: album.tracks.items.map(track => {
//                 return {
//                     trackName: track.name,
//                     trackID: track.id,
//                     artistName: artistName,
//                     artistID: artistID,
//                     albumName: albumName,
//                     albumID: albumID,
//                     previewURL: track.preview_url,
//                     duration: convertMsToMinSec(track.duration_ms),
//                     trackNumber: track.track_number,
//                     albumImage: (album.images.length) ? album.images[0].url : '',
//                     isPlaying: false,
//                     isCurrentlySelected: false,
//                     isTopTrack: false,
//                     identifier: albumID
//                 }
//             })
//         }
//     })
// }







// export function fetchArtist(id, token) {
//     return async function(dispatch, getState) {
//         const currentState =  getState();
//         const market = currentState.market;
//         dispatch(requestArtist())

//         const artistInfo = fetchWrapper(`https://api.spotify.com/v1/artists/${id}`, token);
//         const topTracks = fetchWrapper(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=${market}`, token);
//         const relatedArtists = fetchWrapper(`https://api.spotify.com/v1/artists/${id}/related-artists`, token);
//         const albumIDs = fetchWrapper(`https://api.spotify.com/v1/artists/${id}/albums?album_type=album&market=${market}`, token);

//         const artistInfoComplete = await artistInfo;
//         const topTracksComplete = await topTracks;
//         const relatedArtistsComplete = await relatedArtists;
//         const albumIDsComplete = await albumIDs;

//         const albumsList = transformIDsToList(albumIDsComplete.items);
//         const albumsInfo = await fetchWrapper(`https://api.spotify.com/v1/albums/?ids=${albumsList}`, token);

//         const artistObject = {
//             artistName: artistInfoComplete.name,
//             artistID: artistInfoComplete.id,
//             genres: artistInfoComplete.genres,
//             followers: artistInfoComplete.followers,
//             artistImage: (artistInfoComplete.images.length) ? 
//                             artistInfoComplete.images[0].url :
//                             '',
//             topTracks: createTopTracksArray(topTracksComplete.tracks),
//             relatedArtists: createRelatedArtistsArray(relatedArtistsComplete.artists),
//             albums: createAlbumsArray(albumsInfo.albums)
//         };

//         dispatch(receiveArtist(artistObject))
        
//     }
// }
