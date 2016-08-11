import {
		FORM_UPDATE_VALUE,
		FORM_RESET,
		FORM_INPUT,
		FOCUS,
		BLUR,
		FORM_SUBMIT,
		POST
} from '../constants'

export function handleInput(inputFieldName, value, type) {
	return {
		type: FORM_UPDATE_VALUE,
		payload: { value, inputFieldName, type }
	}
}

export function handleFocus(inputFieldName, value, type) {
	return {
		type: FORM_INPUT + FOCUS,
		payload: { inputFieldName, value, type }
	}
}

export function handleBlur(inputFieldName, value, type) {
	return {
		type: FORM_INPUT + BLUR,
		payload: { inputFieldName, value, type }
	}
}

export function formReset() {
	return {
		type: FORM_RESET
	}
}

export function submitFormData(url) {
	return {
		type: FORM_SUBMIT,
		callApi: url
	}
}

export function submitCompanyFormData(url) {
	return {
		type: FORM_SUBMIT + POST,
		POST: url
	}
}

