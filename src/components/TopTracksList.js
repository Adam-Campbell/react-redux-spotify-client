import React from 'react';
import PropTypes from 'prop-types';
import TopTrack from './TopTrack';

const TopTracksList = props => {
    return (
        <section className="top-tracks-container">
            <h1 className="top-tracks-title">Popular Tracks</h1>
            <ul className="top-tracks-list">

                {
                    props.topTracks.map(track => {
                        return (
                            <TopTrack 
                                name={track.name}
                                id={track.id}
                                key={track.id}
                                image={track.image}
                                duration={track.duration}
                                previewURL={track.previewURL}
                                isPlaying={track.isPlaying}
                                isCurrentlySelected={track.isCurrentlySelected}
                                playPauseTrack={() => props.playPauseTrack(track.id)}
                            />
                        );
                    })
                }

            </ul>
        </section>                   
    );
}

TopTracksList.propTypes = {
    topTracks: PropTypes.array,
    playPauseTrack: PropTypes.func
};

export default TopTracksList;