import {
		FORM_UPDATE_VALUE,
		FORM_INPUT,
		FOCUS,
		BLUR,
		FORM_RESET,
		FORM_SUBMIT,
		SUCCESS,
		ERROR,
		START,
		POST,
		TOGGLE_DOWNLOAD
} from '../constants';

import { fromJS, Map } from 'immutable';
import { validateInputValue } from '../utils';

const form = fromJS({
	formFields: {
		userName: {
			value: '',
			touched: false,
			valid: null,
			error: '',
			request: true
		},
		userEmail: {
			value: '',
			touched: false,
			valid: null,
			error: '',
			request: true
		},
		requestText: {
			value: '',
			touched: false,
			valid: null,
			error: '',
			request: true
		},
		companyName: {
			value: '',
			touched: false,
			valid: null,
			error: '',
			download: true
		},
		companyEmail: {
			value: '',
			touched: false,
			valid: null,
			error: '',
			download: true
		}
	},
	formStatus: null,
	isFetching: false,
	submitSucceeded: null,
	submitFailed: null,
	isDownloadAllowed: null,
	downloadUrl: ""
});

const defaultState = Map(form);

function formReducer(state = form, action) {
	const { type, payload, response, error } = action;

	switch (type) {
		case FORM_UPDATE_VALUE:
			return state.setIn([ 'formFields', payload.inputFieldName, 'value' ], payload.value)
					.setIn([ 'formFields', payload.inputFieldName, 'valid' ], validateInputValue(payload.value, payload.type));
			break;
		case FORM_INPUT + FOCUS:
			return state.setIn([ 'formFields', payload.inputFieldName, 'focus' ], true)
					.setIn([ 'formFields', payload.inputFieldName, 'touched' ], true)
					.setIn([ 'formFields', payload.inputFieldName, 'error' ], '');
			break;
		case FORM_INPUT + BLUR:
			const { value, inputFieldName, type } = payload;
			const isValid = validateInputValue(value, type);
			return state.setIn([ 'formFields', inputFieldName, 'valid' ], isValid)
					.setIn([ 'formFields', inputFieldName, 'error' ], isValid ? '' : 'error')
					.setIn([ 'formFields', inputFieldName, 'focus' ], false);
			break;
		case FORM_SUBMIT + START:
			return state.set('isFetching', true);
			break;
		case FORM_SUBMIT + SUCCESS:
			return state.set('isFetching', false).set('formStatus', response).set('submitSucceeded', true);
			break;
		case FORM_SUBMIT + ERROR:
			return state.set('isFetching', false).set('formStatus', error).set('submitFailed', true);
			break;
		case FORM_SUBMIT + POST:
			return state.set('isFetching', true);
			break;
		case FORM_SUBMIT + POST + ERROR:
			return state.set('isFetching', false).set('submitFailed', true);
			break;
		case TOGGLE_DOWNLOAD:
			return state.set('isFetching', false).set('downloadUrl', response.downloadUrl).set('isDownloadAllowed', true);
			break;
		case FORM_RESET:
			return defaultState;
			break;
		default:
			return state;
			break;
	}
}

export default formReducer