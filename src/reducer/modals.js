import { TOGGLE_REQUEST_MODAL, TOGGLE_DOWNLOAD_MODAL } from '../constants';
import { fromJS } from 'immutable'

const defaultState = fromJS({
	isRequestModalOpen: false,
	isDownloadModalOpen: false
});

function modalReducer(state = defaultState, action) {
	const { type } = action;

	switch (type) {
		case TOGGLE_REQUEST_MODAL:
			return state.set('isRequestModalOpen', !state.get('isRequestModalOpen'));
			break;
		case TOGGLE_DOWNLOAD_MODAL:
			return state.set('isDownloadModalOpen', !state.get('isDownloadModalOpen'));
			break;
		default:
			return state;
			break;
	}
}

export default modalReducer;