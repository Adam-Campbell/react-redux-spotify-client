import * as ActionTypes from '../actiontypes';
import { convertMsToMinSec } from './helpers';


function requestArtist() {
    return {
        type: ActionTypes.FETCH_ARTIST_REQUEST
    }
}

function receiveArtist(artistObject) {
    return {
        type: ActionTypes.FETCH_ARTIST_SUCCESS,
        payload: artistObject
    }
}

function fetchArtistInfo(id, token) {
    const endpoint = `https://api.spotify.com/v1/artists/${id}?access_token=${token}`;
    return fetch(endpoint);
}

function fetchTopTracks(id, token) {
    const endpoint = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=GB&access_token=${token}`;
    return fetch(endpoint);
}

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
            identifier: `${data[i].artists[0].id}-topTracks`
        }
        arr.push(track);
    }
    return arr;
}

function fetchRelatedArtists(id, token) {
    const endpoint = `https://api.spotify.com/v1/artists/${id}/related-artists?access_token=${token}`;
    return fetch(endpoint);
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

function fetchAlbumsIDs(id, token) {
    const endpoint = `https://api.spotify.com/v1/artists/${id}/albums?album_type=album&market=GB&access_token=${token}`;
    return fetch(endpoint);
}

function transformIDsToList(data) {
    return data.filter(album => album.available_markets.includes('GB'))
    .map(album => album.id)
    .join(',')
}

function fetchAlbums(token, albumList) {
    const endpoint = `https://api.spotify.com/v1/albums/?ids=${albumList}&access_token=${token}`;
    return fetch(endpoint);
}

function createAlbumsArray(data) {
    return data.map(album => {
        let artistName = album.artists[0].name;
        let artistID = album.artists[0].id;
        let albumName = album.name;
        let albumID = album.id;
        return {
            albumID: albumID,
            albumName: albumName,
            artistName: artistName,
            artistID: artistID,
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
    })
}


export function fetchArtist(id, token) {
    return async function(dispatch) {
        dispatch(requestArtist())

        const artistObject = {};

        const artistInfo = fetchArtistInfo(id, token);
        const topTracks = fetchTopTracks(id, token);
        const relatedArtists = fetchRelatedArtists(id, token);
        const albumsIDs = fetchAlbumsIDs(id, token);


        const artistInfoComplete = await artistInfo;
        const artistInfoJSON = await artistInfoComplete.json();
        artistObject.artistName = artistInfoJSON.name;
        artistObject.artistID = artistInfoJSON.id;
        artistObject.genres = artistInfoJSON.genres;
        artistObject.followers = artistInfoJSON.followers.total;
        artistObject.artistImage = (artistInfoJSON.images.length) ? 
                                artistInfoJSON.images[0].url :
                                '';
        
        const topTracksComplete = await topTracks;
        const topTracksJSON = await topTracksComplete.json();
        artistObject.topTracks = createTopTracksArray(topTracksJSON.tracks);
        
        const relatedArtistsComplete = await relatedArtists;
        const relatedArtistsJSON = await relatedArtistsComplete.json();
        artistObject.relatedArtists = createRelatedArtistsArray(relatedArtistsJSON.artists);
        
        const albumsIDsComplete = await albumsIDs;
        const albumsIDsJSON = await albumsIDsComplete.json();
        const albumList = transformIDsToList(albumsIDsJSON.items);

        const albums = await fetchAlbums(token, albumList);
        const albumsJSON = await albums.json();
        artistObject.albums = createAlbumsArray(albumsJSON.albums);
        
        dispatch(receiveArtist(artistObject))
        
    }
}
