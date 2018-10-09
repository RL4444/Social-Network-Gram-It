import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import axios from "./axios";
import Logo from "./Logo";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { init } from "./socket";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxPromise))
);

const elem = (init(store),
(
  <Provider store={store}>
    <App />
  </Provider>
));

ReactDOM.render(
  location.pathname == "/welcome" ? <Welcome /> : elem,
  document.querySelector("main")
);
