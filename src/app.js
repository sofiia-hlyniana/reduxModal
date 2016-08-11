import React from 'react';
import { render } from 'react-dom';
import AppContainer from './containers/AppContainer';
import store from './store';

const requestModalButton = document.getElementsByClassName('footer__request');
const modalContainer = document.getElementById('request-modal');

function renderComponent () {
	if (requestModalButton && modalContainer) {
		render( <AppContainer store = { store } modalConfig = { modalConfig } />, modalContainer );
	}
}

renderComponent();