import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import { debounce } from 'lodash';


class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.debouncedSearch = debounce(this.props.fetchSearchResults, 350);
    }
   

    render() {
        return (
            <section className="search-box">
                <p className="search-box__label">Search for an artist</p>
                <input 
                    type="text" 
                    className="search-box__input" 
                    placeholder="Start typing..."
                    value={this.props.currentSearch}
                    onChange={
                        e => {
                            e.preventDefault();
                            e.persist();
                            this.props.updateSearch(e.target.value);
                            if (e.target.value.length) {
                                this.debouncedSearch(e.target.value, this.props.accessToken);  
                            }
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
        currentSearch: state.searchResults.currentSearch
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
