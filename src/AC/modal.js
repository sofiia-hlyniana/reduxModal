import { TOGGLE_REQUEST_MODAL, TOGGLE_DOWNLOAD_MODAL } from '../constants';

export function toggleRequestModal() {
	return {
		type: TOGGLE_REQUEST_MODAL
	}
}

export function toggleDownloadModal() {
	return {
		type: TOGGLE_DOWNLOAD_MODAL
	}
}