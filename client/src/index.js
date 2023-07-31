import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./shared/features/store";
import "./index.css";
import ScrollToTop from "./shared/hooks/scroll-to-top";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>

      <App />
    </Provider>
  </React.StrictMode>
);
