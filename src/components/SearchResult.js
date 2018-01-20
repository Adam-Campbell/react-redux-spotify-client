import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchResult = props => {
    return (
        <div className="results__result-container">
            <Link
                to="/artist"
                className="results__result-link"
                onClick={() => props.fetchArtist(props.id, props.accessToken)}
            >
                <div 
                    className="results__result-image" 
                    style={{backgroundImage: `url('${props.image}')`}}
                >
                </div>
                <p className="results__result-name">{props.name}</p>
            </Link>
        </div>
    );
}


SearchResult.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    fetchArtist: PropTypes.func.isRequired
};

export default SearchResult;