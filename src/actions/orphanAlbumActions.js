import * as ActionTypes from '../actiontypes';
import { convertMsToMinSec, fetchWrapper, placeholderMusicImageArray } from '../helpers';
import { errorModalOpen } from './modalActions';

//
// Helper / formatting functions 
//

const formatOrphanAlbum = album => {
    const artistName = album.artists[0].name;
    const artistID = album.artists[0].id;
    const albumName = album.name;
    const albumID = album.id;
    return {
        artistID: artistID,
        artistName: artistName,
        albumID: albumID,
        albumName: albumName,
        releaseDate: album.release_date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1'),
        albumImage: album.images.length ? album.images : placeholderMusicImageArray,
        albumTracks: album.tracks.items.map(track => ({
                trackName: track.name,
                trackID: track.id,
                trackURI: track.uri,
                artistName: artistName,
                artistID: artistID,
                albumName: albumName,
                albumID: albumID,
                previewURL: track.preview_url,
                duration: convertMsToMinSec(track.duration_ms),
                trackNumber: track.track_number,
                albumImage: album.images.length ? album.images : placeholderMusicImageArray,
                identifier: albumID
        }))
    };
};


//
// Actions
//

const requestOrphanAlbum = () => ({
    type: ActionTypes.FETCH_ORPHAN_ALBUM_REQUEST
});

const receiveOrphanAlbum = (albumObject, key) => ({
    type: ActionTypes.FETCH_ORPHAN_ALBUM_SUCCESS,
    payload: {
        album: albumObject,
        key: key
    }
});

export const fetchOrphanAlbum = (token, id) => async (dispatch, getState)  => {
    dispatch(requestOrphanAlbum());

    const market = getState().userInfo.market;

    try {
        const albumInfo = await fetchWrapper(`https://api.spotify.com/v1/albums/${id}?market=${market}`, token);
        const album = formatOrphanAlbum(albumInfo);        
        dispatch(receiveOrphanAlbum(album, id));
    } catch(e) {
        dispatch(errorModalOpen(e));
    }
};
