import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
//import App from './App';
import Router from './routes/Router'
import registerServiceWorker from './registerServiceWorker';
import planApp from './store/reducers/';
import {requestPlanStudyAll} from './store/thunks/plan-study'

const store = createStore(planApp, applyMiddleware(thunk));
store.dispatch(requestPlanStudyAll())

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
