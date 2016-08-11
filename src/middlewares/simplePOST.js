import { START, SUCCESS, ERROR,  TOGGLE_DOWNLOAD, TOGGLE_DOWNLOAD_MODAL } from '../constants'
import { generateRequestString, createCORSRequest } from '../utils'

export default store => next => action => {

	const { POST, type, ...rest } = action;
	if (!POST) return next(action);

	next({ ...rest, type: type + START });
	const formData = store.getState().form.get('formFields').filter(input => input.has('download')).map(input => input.get('value')).toJS();

	setTimeout(() => {
		// const data = { ...formData, email: 'test@email.com' };
		const data = { ...formData };
		const requestBody = generateRequestString(data);
		const request = createCORSRequest('POST', POST);

		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		request.send(requestBody);

		request.onload = function () {

			const response = JSON.parse(request.responseText);

			if (request.status === 200) {
				next({ ...rest, type: TOGGLE_DOWNLOAD, response });
				setTimeout(() => (next({ ...rest, type: TOGGLE_DOWNLOAD_MODAL })), 10000);
			} else {
				next({ ...rest, type: type + ERROR })
			}
		}
	}, 200)
}