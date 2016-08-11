import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
// import logger from '../middlewares/logger'
import callApi from '../middlewares/callApi'
import POST from '../middlewares/simplePOST'
import thunk from 'redux-thunk'

const enhancer = compose(
		applyMiddleware(thunk, callApi, POST)
		// window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, {}, enhancer);

export default store;