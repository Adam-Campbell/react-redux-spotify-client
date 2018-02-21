import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

const ErrorModal = props => {
    if (props.currentModal === 'ErrorModal') {
        return (
            <div className="modal__overlay">
                <div className="modal__dialog-box modal__dialog-box--warning">

                    <h1 className="modal__title">Oops, something went wrong!</h1>
                    <p className="modal__text">The following error was encountered:</p>
                    <p className="modal__text">{props.errorInfo.status} error, {props.errorInfo.message}.</p>
                    <p className="modal__text">Please try again.</p>
                    <button
                        className="modal__button"
                        onClick={props.closeModal}
                    >Close</button>

                </div>
            </div>
        );
    } else {
        return null;
    }
}

const mapStateToProps = state => {
    return {
        currentModal: state.modalInfo.currentModal,
        errorInfo: state.modalInfo.modalData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal() {
            dispatch(
                ActionCreators.closeModal()
            );
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);


