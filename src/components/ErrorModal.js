import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import FadeInContainer from './FadeInContainer';

const ErrorModal = props => {
    if (props.currentModal === 'ErrorModal') {
        return (
            <FadeInContainer>
                <div className="modal__overlay">
                    <div className="modal__dialog-box modal__dialog-box--warning">

                        <h1 className="modal__title">Oops, something went wrong!</h1>
                        <p className="modal__text">The following error was encountered:</p>
                        <p className="modal__text">{props.errorInfo.status} error, {props.errorInfo.message}.</p>
                        <p className="modal__text">Please try again.</p>
                        <button
                            className="button button--light"
                            onClick={props.closeModal}
                        >Close</button>

                    </div>
                </div>
            </FadeInContainer>
        );
    } else {
        return null;
    }
}

const mapStateToProps = state => ({
    currentModal: state.modalInfo.currentModal,
    errorInfo: state.modalInfo.modalData
});

export default connect(
    mapStateToProps, 
    {closeModal: ActionCreators.closeModal}
)(ErrorModal);


