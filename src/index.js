import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import planApp from './store/reducers/';
import {requestPlanStudyByYear} from './store/thunks/plan-study'

const store = createStore(planApp, applyMiddleware(thunk));

const unsubscribe = store.subscribe(() =>
  console.log("STORE", store.getState())
)

store.dispatch(requestPlanStudyByYear('Learn about actions'))
// store.dispatch(rejectedPlanStudy('Learn about actions'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
