import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from "./App";
import { rootReducer } from "./reducer";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk), 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

ReactDOM.render(
  <div>
    <Provider store = {store}>
      <App/>
    </Provider>
  </div>,
  document.getElementById('root')
);

reportWebVitals();
