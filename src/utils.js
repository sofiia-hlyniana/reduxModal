import { TEXT, TEXTAREA, EMAIL, emailRegEx } from './constants';
import $ from 'jquery';

export const validateInputValue = (value, type) => {
	switch (type) {
		case EMAIL:
			return emailRegEx.test(value);
		case TEXT:
			return value.length > 0;
		case TEXTAREA:
			return value.length > 0;
		default:
			return
	}
};

export const generateRequestString = (...args) => {
	// args should be an object or array of objects
	// returns uri encoded string

	if (!args.length) return;

	const dataArray = [];

	args.forEach((object) => {
		for (let prop in object) {
			dataArray.push(`${prop}=${encodeURIComponent(object[ prop ])}`);
		}
	});

	return dataArray.join('&');
};

export const createCORSRequest = (method, url) => {
	let xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		// XHR for Chrome/Firefox/Opera/Safari.
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
		// XDomainRequest for IE.
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		// CORS not supported.
		xhr = null;
	}
	return xhr;
};

export const detectIE = () => {
	let edge, msie, rv, trident, ua;

	ua = window.navigator.userAgent;
	msie = ua.indexOf('MSIE ');

	if (msie > 0) {
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}
	trident = ua.indexOf('Trident/');
	if (trident > 0) {
		rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}
	edge = ua.indexOf('Edge/');
	if (edge > 0) {
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}
	return false;
};

export const initDetectIe = () => {

	window.IEversion = detectIE();

	if (IEversion !== false) {
		$('html').addClass('ie');
	}
};