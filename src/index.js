import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CryptoContext from "./CryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";
import { Provider } from "react-redux";
import store from "./app/store";
import "antd/dist/antd.css";

ReactDOM.render(
  <React.StrictMode>
    <CryptoContext>
    <Provider store={store}>
      <App />
    </Provider>
    </CryptoContext>
  </React.StrictMode>,
  document.getElementById("root")
);
