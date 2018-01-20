import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import SearchResult from './SearchResult';

class SearchResults extends Component {

    render() {
        //console.log(this.props.searchResults);
        return (
            <section className="results">
                <h1 className="results__title">Artist Results</h1>
                <div className="results__container">

                    {
                        
                            this.props.searchResults.map(result => {
                                return (
                                    <SearchResult 
                                        name={result.name}
                                        id={result.id}
                                        key={result.id}
                                        image={result.image}
                                        accessToken={this.props.accessToken}
                                        fetchArtist={this.props.fetchArtist}
                                    />
                                );
                            })
                        
                    }

                    
                </div>
            </section>
        );
    }

}



const mapStateToProps = state => {
    return {
        searchResults: state.searchResults,
        accessToken: state.accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArtist(id, token) {
            dispatch(
                ActionCreators.fetchArtist(id, token)
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);