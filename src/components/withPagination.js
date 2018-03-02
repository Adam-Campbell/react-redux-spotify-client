import React, { Component } from 'react';


const withPagination = Component => {
    return class extends React.Component {

        constructor(props) {
            super(props);
            this.setPage = this.setPage.bind(this);
            this.state = {currentPage: 1};  
        }

        setPage(e, num) {
            e.preventDefault();
            this.setState({currentPage: parseInt(num)});
        }

        render() {

            const addedProps = {
                currentPage: this.state.currentPage,
                setPage: this.setPage
            }

            return <Component {...this.props} {...addedProps} />
        }
    }
}


export default withPagination;