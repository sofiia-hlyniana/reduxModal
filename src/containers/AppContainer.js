import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import DownloadModalContainer from './DownloadModalContainer'
import RequestModalContainer from './RequestModalContainer'

class AppContainer extends Component {
	constructor(props) {
		super(props)
	}

	static PropTypes = {
		store: PropTypes.object
	};

	static childContextTypes = {
		modalConfig: PropTypes.object,
	};

	getChildContext() {
		return { modalConfig: this.props.modalConfig }
	}

	render() {

		return (
				<Provider store={this.props.store}>
					<div>
						<RequestModalContainer />
						<DownloadModalContainer />
					</div>
				</Provider>
		)
	}
}

export default AppContainer;
