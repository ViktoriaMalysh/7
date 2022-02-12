import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from './store/store';
import App from "./App";


ReactDOM.render(
  <div>
    <Provider store={store}>
      <PersistGate loading={null}  persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </div>,
  document.getElementById("root")
);
 
