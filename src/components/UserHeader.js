import React from 'react';
import PropTypes from 'prop-types';

const UserHeader = props => {
    return (
        <header className="user-header">
            <img src={props.userImage} className="user-header__image"></img>
            <h1 className="heading heading--regular">{props.userName}</h1>
        </header>
    );
}

UserHeader.propTypes = {
   userName: PropTypes.string,
   userImage: PropTypes.string 
}

export default UserHeader;