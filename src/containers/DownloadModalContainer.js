import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import ModalContainer from './ModalContainer';
import DownloadForm from './DownloadForm';
import { toggleDownloadModal } from '../AC/modal'

class DownloadModalContainer extends Component {
	constructor(props) {
		super(props);
		this.handleOutsideButtonClick = this.handleOutsideButtonClick.bind(this);
	}

	static PropTypes = {
		isDownloadModalOpen: PropTypes.bool.isRequired,
		toggleDownloadModal: PropTypes.func
	};

	static contextTypes = {
		modalConfig: PropTypes.object
	};

	componentDidMount() {
		window.addEventListener('downloadButtonClick', this.handleOutsideButtonClick)
	}

	componentWillUnmount() {
		window.removeEventListener('downloadButtonClick', this.handleOutsideButtonClick)
	}

	handleOutsideButtonClick = (ev) => {
		ev.preventDefault();
		this.props.toggleDownloadModal()
	};


	render() {
		const { isDownloadModalOpen, toggleDownloadModal, isDownloadAllowed } = this.props;
		const { modalConfig: { modals: { downloadModal } } } = this.context;
		return (
				<ModalContainer
						isOpen={isDownloadModalOpen}
						modalConfig={this.context.modalConfig}
						onRequestClose={toggleDownloadModal}
				>
					{ isDownloadAllowed ? null : <div className="request-modal__title">{ downloadModal.title }</div> }
					{ this.getModalForm() }
				</ModalContainer>
		);
	}

	getModalForm() {
		const { modalConfig: { modals: { downloadModal } } } = this.context;
		const inputs = downloadModal.inputFields;
		return (
				<DownloadForm
						inputs={ inputs }
						buttonText={ downloadModal.buttonText }
						buttonUrl={ downloadModal.buttonUrl }
						download={downloadModal.fileName}
						errorMessage={downloadModal.errorMessage}
						ajaxUrl={downloadModal.ajaxUrl}
				/>
		)
	}
}

export default connect((state) => ({
	isDownloadModalOpen: state.modals.get('isDownloadModalOpen'),
	isDownloadAllowed: state.form.get('isDownloadAllowed')
}), { toggleDownloadModal })(DownloadModalContainer);