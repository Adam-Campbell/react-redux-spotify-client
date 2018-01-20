import React from 'react';
import PropTypes from 'prop-types';
import RecentTrack from './RecentTrack';

const RecentTracksList = props => {
    return (
        <section className="recent-tracks">
            <h2 className="recent-tracks__title">Recently Played</h2>
            <ul className="recent-tracks__list">
                {
                    props.recentTracks.map(track => {
                        return (
                            <RecentTrack 
                                id={track.id}
                                key={track.id}
                                name={track.name}
                                image={track.image}
                                duration={track.duration}
                                artistName={track.artistName}
                                previewURL={track.previewURL}
                                isCurrentlySelected={track.isCurrentlySelected}
                                isPlaying={track.isPlaying}
                            />
                        );
                    })
                }
            </ul>
        </section>
    );
}

RecentTracksList.propTypes = {
    recentTracks: PropTypes.array.isRequired
}


export default RecentTracksList;