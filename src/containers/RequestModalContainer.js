import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ModalContainer from './ModalContainer';
import RequestForm from './RequestForm';

import { toggleRequestModal } from '../AC/modal';

import '../assets/request-modal.styl'

class RequestModalContainer extends Component {
	constructor(props) {
		super(props);
		this.handleOutsideButtonClick = this.handleOutsideButtonClick.bind(this);
	}

	static PropTypes = {
		isRequestModalOpen: PropTypes.bool.isRequired,
		toggleRequestModal: PropTypes.func,
		submitSucceeded: PropTypes.bool
	}

	static contextTypes = {
		modalConfig: PropTypes.object
	};

	componentDidMount() {
		window.addEventListener('requestButtonClick', this.handleOutsideButtonClick)
	}

	componentWillUnmount() {
		window.removeEventListener('requestButtonClick', this.handleOutsideButtonClick)
	}

	handleOutsideButtonClick = (ev) => {
		ev.preventDefault();
		this.props.toggleRequestModal();
	};

	render() {

		const { isRequestModalOpen, toggleRequestModal, submitSucceeded } = this.props;
		const { modalConfig: { modals: { requestModal } } } = this.context;
		return (
				<ModalContainer
						isOpen={isRequestModalOpen}
						onRequestClose={toggleRequestModal}
				>
					{ submitSucceeded ? null : <div className="request-modal__title">{ requestModal.title }</div> }
					{ this.getModalForm() }
				</ModalContainer>
		);
	}

	getModalForm() {
		const { isRequestModalOpen } = this.props;
		const { modalConfig: { modals: { requestModal } } } = this.context;
		const inputs = requestModal.inputFields;
		return isRequestModalOpen ? (
				<RequestForm
						inputs={ inputs }
						buttonText={ requestModal.buttonText }
						ajaxUrl={requestModal.ajaxUrl}
						errorMessage={ requestModal.errorMessage }/>
		) : null
	}

}

export default connect((state) => ({
	isRequestModalOpen: state.modals.get('isRequestModalOpen'),
	submitSucceeded: state.form.get('submitSucceeded')
}), {
	toggleRequestModal
})(RequestModalContainer)
