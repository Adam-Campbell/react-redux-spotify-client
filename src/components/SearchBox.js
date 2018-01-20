import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';


class SearchBox extends Component {

    

    render() {
        return (
            <section className="search">
                <p className="search__label">Search for an artist</p>
                <input 
                    type="text" 
                    className="search__input" 
                    placeholder="Start typing..."
                    value={this.props.currentSearch}
                    onChange={
                        e => {
                            e.preventDefault();
                            this.props.updateSearch(e.target.value);
                            this.props.fetchSearchResults(e.target.value, this.props.accessToken);
                        }
                    }
                >
                </input>
            </section>
        );        
    }

}


const mapStateToProps = state => {
    return {
        accessToken: state.accessToken,
        currentSearch: state.currentSearch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSearch(search) {
            dispatch(
                ActionCreators.updateSearch(search)
            );
        },
        fetchSearchResults(query, token) {
            dispatch(
                ActionCreators.fetchSearchResults(query, token)
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);