import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import '../assets/request-modal.styl'

class ModalContainer extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		const { isOpen, onRequestClose, children } = this.props;

		return (
				<Modal
						isOpen={ isOpen }
						onAfterOpen={ this.getOpenModalStyles }
						onRequestClose={ onRequestClose }
						className="request-modal"
						overlayClassName="request-modal__container">
					{ children }
				</Modal>
		);
	}

	getOpenModalStyles() {
		this.style.overlay.opacity = 1;
		this.style.content.opacity = 1;
	}
}

export default ModalContainer;
