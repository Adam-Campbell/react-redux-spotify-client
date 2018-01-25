import * as ActionTypes from '../actiontypes';
import { convertMsToMinSec } from './helpers';


function requestOrphanAlbum() {
    return {
        type: ActionTypes.FETCH_ORPHAN_ALBUM_REQUEST
    }
}

function receiveOrphanAlbum(albumObject, key) {
    return {
        type: ActionTypes.FETCH_ORPHAN_ALBUM_SUCCESS,
        payload: {
            album: albumObject,
            key: key
        }
    }
}


function formatOrphanAlbum(album) {
    let artistName = album.artists[0].name;
    let artistID = album.artists[0].id;
    let albumName = album.name;
    let albumID = album.id;
    return {
        artistID: artistID,
        artistName: artistName,
        albumID: albumID,
        albumName: albumName,
        releaseDate: album.release_date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1'),
        albumImage: (album.images.length) ? album.images[0].url : '',
        albumTracks: album.tracks.items.map(track => {
            return {
                trackName: track.name,
                trackID: track.id,
                artistName: artistName,
                artistID: artistID,
                albumName: albumName,
                albumID: albumID,
                previewURL: track.preview_url,
                duration: convertMsToMinSec(track.duration_ms),
                trackNumber: track.track_number,
                albumImage: (album.images.length) ? album.images[0].url : '',
                isPlaying: false,
                isCurrentlySelected: false,
                isTopTrack: false,
                identifier: albumID
            }
        })
    }
}


export function fetchOrphanAlbum(token, id) {
    return async function(dispatch) {
        dispatch(requestOrphanAlbum());
        const getAlbum = await fetch(`https://api.spotify.com/v1/albums/${id}?access_token=${token}`);
        const getAlbumJSON = await getAlbum.json();

        const album = formatOrphanAlbum(getAlbumJSON);        

        dispatch(receiveOrphanAlbum(album, id));
    }
}

