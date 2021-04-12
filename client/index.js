import React from "react";
import ReactDOM from "react-dom";
import "../public/index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app") // make sure this is the same as the id of the div in your index.html
);
