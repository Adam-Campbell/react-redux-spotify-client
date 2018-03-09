import React from 'react';
import PropTypes from 'prop-types';
import FollowerCountAndStatus from './FollowerCountAndStatus';

const UserHeader = props => (
    <header className="user-header">
        <img src={props.userImage} className="user-header__image"></img>
        <h1 className="heading heading--regular">{props.userName}</h1>
        <FollowerCountAndStatus 
            followerCount={props.userFollowers}
            isFollowing={false}
            shouldShowButton={false}
            shouldCenter={true}
        />
    </header>
);

UserHeader.propTypes = {
   userName: PropTypes.string,
   userImage: PropTypes.string 
};

export default UserHeader;