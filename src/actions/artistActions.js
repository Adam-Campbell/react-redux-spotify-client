import * as ActionTypes from '../actiontypes';
import { 
    convertMsToMinSec, 
    fetchWrapper, 
    placeholderArtistImageArray, 
    placeholderMusicImageArray 
} from '../helpers';
import { errorModalOpen } from './modalActions';


//
// Helper / formatting functions 
//

const createTopTracksArray = (data, identifier) => (
    data.map(track => ({
        trackName: track.name,
        trackID: track.id,
        trackURI: track.uri,
        artistName: track.artists[0].name,
        artistID: track.artists[0].id,
        albumName: track.album.name,
        albumID: track.album.id,
        previewURL: track.preview_url,
        albumImage: track.album.images.length ? track.album.images : placeholderMusicImageArray,
        duration: convertMsToMinSec(track.duration_ms),
        identifier: identifier,
    })).slice(0,5)
);

const createRelatedArtistsArray = data => (
    data.map(artist => ({
        artistName: artist.name,
        artistID: artist.id,
        artistImage: artist.images.length ? artist.images : placeholderArtistImageArray
    }))
);

const createAlbumsArray = data => (
    data.map(album => ({
        albumName: album.name,
        albumID: album.id,
        albumType: album.album_type,
        albumImage: album.images.length ? album.images : placeholderMusicImageArray,
        artistName: album.artists[0].name,
        artistID: album.artists[0].id
    }))
);



//
// Actions
//

const requestArtist = () => ({
    type: ActionTypes.FETCH_ARTIST_REQUEST
});

const receiveArtist = (artistObject, artistID) => ({
    type: ActionTypes.FETCH_ARTIST_SUCCESS,
    payload: {
        artistObject: artistObject,
        artistID: artistID
    }
});

export const switchCurrentArtist = artistID => ({
    type: ActionTypes.SWITCH_CURRENT_ARTIST,
    payload: artistID
});

export const fetchArtist = (id, token) => async (dispatch, getState) => {
    const market = getState().userInfo.market;
    dispatch(requestArtist());

    try {
        const artistInfo = fetchWrapper(`https://api.spotify.com/v1/artists/${id}`, token);
        const topTracks = fetchWrapper(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=${market}`, token);
        const relatedArtists = fetchWrapper(`https://api.spotify.com/v1/artists/${id}/related-artists`, token);
        const albums = fetchWrapper(`https://api.spotify.com/v1/artists/${id}/albums?album_type=album,single&limit=50&market=${market}`, token);
        const checkIfFollowing = fetchWrapper(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`, token);

        const artistInfoComplete = await artistInfo;
        const topTracksComplete = await topTracks;
        const relatedArtistsComplete = await relatedArtists;
        const albumsComplete = await albums;
        const isFollowing = await checkIfFollowing;
        
        const artistObject = {
            artistName: artistInfoComplete.name,
            artistID: artistInfoComplete.id,
            genres: artistInfoComplete.genres,
            followers: artistInfoComplete.followers.total,
            isFollowing: isFollowing[0], 
            artistImage: artistInfoComplete.images.length ? artistInfoComplete.images : placeholderArtistImageArray,
            topTracks: createTopTracksArray(topTracksComplete.tracks, artistInfoComplete.id),
            relatedArtists: createRelatedArtistsArray(relatedArtistsComplete.artists),
            albums: createAlbumsArray(albumsComplete.items)
        };
        dispatch(receiveArtist(artistObject, id));
    } catch(e) {
        dispatch(errorModalOpen(e));
    }   
};
