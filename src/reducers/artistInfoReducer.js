import * as ActionTypes from '../actiontypes';



export default function artistInfo(state={}, action) {
    switch (action.type) {

        case ActionTypes.FETCH_ARTIST_SUCCESS:
            return action.payload;

        case ActionTypes.PLAY_PAUSE_TRACK:
            return {
                    ...state,
                    topTracks: state.topTracks.map(track => {
                        if (track.trackID === action.payload) {
                            return {
                                ...track,
                                isCurrentlySelected: true,
                                isPlaying: !track.isPlaying
                            }
                        } else {
                            return {
                                ...track,
                                isCurrentlySelected: false,
                                isPlaying: false
                            }
                        }
                    }),
                    albums: state.albums.map(album => {
                        return {
                            ...album,
                            albumTracks: album.albumTracks.map(track => {
                                if (track.trackID === action.payload) {
                                    return {
                                        ...track, 
                                        isCurrentlySelected: true,
                                        isPlaying: !track.isPlaying
                                    }
                                } else {
                                    return {
                                        ...track, 
                                        isCurrentlySelected: false,
                                        isPlaying: false
                                    }
                                }
                            })
                        }
                    })

                }

        case ActionTypes.SKIP_TRACK_FORWARDS:
                return {
                    ...state,
                    topTracks: moveStateToNextTrack(state.topTracks),
                    albums: state.albums.map(album => {
                        return {
                            ...album, 
                            albumTracks: moveStateToNextTrack(album.albumTracks)
                        }
                    })
                }

        case ActionTypes.SKIP_TRACK_BACKWARDS:
                return {
                    ...state,
                    topTracks: moveStateToPreviousTrack(state.topTracks),
                    albums: state.albums.map(album => {
                        return {
                            ...album, 
                            albumTracks: moveStateToPreviousTrack(album.albumTracks)
                        }
                    })
                }

        default:
            return state;
    }      
}
