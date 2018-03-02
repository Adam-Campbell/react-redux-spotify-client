import * as ActionTypes from '../actiontypes';
import { convertMsToMinSec, genericFetchWrapper } from './helpers';
import { errorModalOpen } from './modalActions';
import { dummyImageArray } from '../imageSizePicker';

//
// Exported thunk action
//

export function fetchArtist(id, token) {
    return async function(dispatch, getState) {
        const currentState =  getState();
        const market = currentState.market;
        dispatch(requestArtist())
        try {
            const artistInfo = genericFetchWrapper(`https://api.spotify.com/v1/artists/${id}`, token);
            const topTracks = genericFetchWrapper(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=${market}`, token);
            const relatedArtists = genericFetchWrapper(`https://api.spotify.com/v1/artists/${id}/related-artists`, token);
            const albums = genericFetchWrapper(`https://api.spotify.com/v1/artists/${id}/albums?album_type=album,single&limit=50&market=${market}`, token);

            const artistInfoComplete = await artistInfo;
            const topTracksComplete = await topTracks;
            const relatedArtistsComplete = await relatedArtists;
            const albumsComplete = await albums;

            const artistObject = {
                artistName: artistInfoComplete.name,
                artistID: artistInfoComplete.id,
                genres: artistInfoComplete.genres,
                followers: artistInfoComplete.followers,
                artistImage: artistInfoComplete.images.length ? 
                                artistInfoComplete.images :
                                dummyImageArray,
                topTracks: createTopTracksArray(topTracksComplete.tracks, artistInfoComplete.id),
                relatedArtists: createRelatedArtistsArray(relatedArtistsComplete.artists),
                albums: createAlbumsArray(albumsComplete.items)
            };

            dispatch(receiveArtist(artistObject, id));
        } catch(e) {
            dispatch(errorModalOpen(e));
        }
        
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

function createTopTracksArray(data, identifier) {
    return data.map(track => {
        return {
            trackName: track.name,
            trackID: track.id,
            trackURI: track.uri,
            artistName: track.artists[0].name,
            artistID: track.artists[0].id,
            albumName: track.album.name,
            albumID: track.album.id,
            previewURL: track.preview_url,
            albumImage: track.album.images.length ? track.album.images : dummyImageArray,
            duration: convertMsToMinSec(track.duration_ms),
            identifier: identifier,
        }
    }).slice(0,5)
}

function createRelatedArtistsArray(data) {
    return data.map(artist => {
        return {
            artistName: artist.name,
            artistID: artist.id,
            artistImage: artist.images.length ? artist.images : dummyImageArray
        }
    })
}

function createAlbumsArray(data) {
    return data.map(album => {
        return {
            albumName: album.name,
            albumID: album.id,
            albumType: album.album_type,
            albumImage: album.images.length ? album.images : dummyImageArray,
            artistName: album.artists[0].name,
            artistID: album.artists[0].id
        }
    })
}

