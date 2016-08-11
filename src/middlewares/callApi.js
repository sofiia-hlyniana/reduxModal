import { START, SUCCESS, ERROR, TOGGLE_REQUEST_MODAL } from '../constants'
import { generateRequestString, createCORSRequest } from '../utils'

export default store => next => action => {

	const { callApi, type, ...rest } = action;
	if (!callApi) return next(action);

	next({ ...rest, type: type + START });
	const formData = store.getState().form.get('formFields').filter(input => input.has('request')).map(input => input.get('value')).toJS();

	setTimeout(() => {
		// const data = { ...formData, email: 'test@email.com' };
		const data = { ...formData };
		const requestBody = generateRequestString(data);
		const request = createCORSRequest('POST', callApi);

		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		request.send(requestBody);

		request.onload = function () {
			const response = JSON.parse(request.responseText);

			if (request.status === 200) {

				setTimeout(() => (next({ ...rest, type: TOGGLE_REQUEST_MODAL })), 3000);
				next({ ...rest, type: type + SUCCESS, response })

			} else if (request.status === 409) {
				next({ ...rest, type: type + ERROR })
			}
		}
	}, 200)
}