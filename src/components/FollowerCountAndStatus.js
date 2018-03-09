import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';

const FollowerCountAndStatus = props => (
    <div className={props.shouldCenter ? "follow-status" : "follow-status follow-status--align-left"}>
        <FontAwesomeIcon 
            icon={faUsers}
        />
        <p className="follow-status__text">{props.followerCount} followers</p>
        {
            props.shouldShowButton && <button
                className="button"
                onClick={() => props.isFollowing ? props.unfollow() : props.follow()}
            >
                {props.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
        }
    </div>
);

FollowerCountAndStatus.propTypes = {
    followerCount: PropTypes.number,
    isFollowing: PropTypes.bool,
    shouldShowButton: PropTypes.bool,
    shouldCenter: PropTypes.bool,
    followArtist: PropTypes.func,
    unfollowArtist: PropTypes.func,
};

export default FollowerCountAndStatus;







// {
//     props.isFollowing ? (
//     <button
//         className="button"
//         onClick={props.unfollowArtist}
//     >Unfollow</button>
//     ) : (
//     <button
//         className="button"
//         onClick={props.followArtist}
//     >Follow</button>
//     )
// }