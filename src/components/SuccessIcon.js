import React, { Component, PropTypes } from 'react';
// import { initDetectIe } from '../utils'
import '../assets/modal-message.styl';

export default function SuccessIcon() {
	// initDetectIe();
	if (document.documentElement.classList.contains('ie')) {
		return (
				<div className="modal-message__image">
					<img src="assets/i/success-icon.png" alt="success" width="140" height="140"/>
				</div>
	)}
	return (
			<div className="modal-message__image">
				<svg className="modal-message__icon" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 140 140"
						 width="140"
						 height="140"
						 viewBox="0 0 140 140">
					<clipPath id="check-clip-mask">
						<path
								className="modal-message__icon-mask"
								fill="none"
								d="M50.5 59.9c-1.9-1.9-4.9-1.9-6.7 0-1.7 1.9-1.9 4.9 0 6.7l29.6 29.6 64.6-64.5c1.9-1.9 1.9-4.9 0-6.7-1.9-1.9-4.9-1.9-6.7 0l-57.9 57.8-22.9-22.9zm89.1 2.2c-.5-2.5-3.5-3.8-5.4-2.1l-2.7 2.4c-.8.6-1.1 1.6-1.1 2.5 0 1.6-.2 2.9-.2 4.9 0 34.9-29.4 62.9-64.7 60.3-29.7-2.1-53.9-26.3-56-56-2.4-35.2 25.6-64.6 60.4-64.6 14.2 0 27 4.9 37.4 13.1 1.4 1.1 3.3.8 4.5-.5l2.1-2.5c1.1-1.4.8-3.3-.5-4.5-12.8-10.1-29-15.8-46.6-15-35.8 1.6-64.8 30.4-66.7 65.9-2.4 42.2 32.8 76.9 75.1 73.9 32.6-2.4 59.5-27.5 64.1-59.8.8-6.2.9-12.2.3-18z"
						/>
					</clipPath>
					<g clip-path="url(#check-clip-mask)">
						<path
								className="modal-message__icon-check"
								fill="none"
								stroke="#0095da"
								strokeWidth="5"
								d="M43.9 59.9l29.8 30 64.4-64.8"
						/>
						<path
								className="modal-message__icon-circle"
								fill="none"
								stroke="#0095da"
								strokeWidth="5"
								d="M134.4,60.7c0.4,3,0.6,6.1,0.6,9.3c0,36.2-29.1,65.5-65.1,65.5S4.9,106.2,4.9,70S34.1,4.5,70,4.5c16.4,0,31.4,6.1,42.9,16.2"
						/>
					</g>
				</svg>
			</div>
	)
};