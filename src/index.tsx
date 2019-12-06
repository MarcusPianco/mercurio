import React from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import App from "./App";
import { HashRouter, BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Provider from "./context/Provider";
ReactDOM.render(
  <BrowserRouter>
    <HashRouter>
      <ScrollToTop>
        <Provider>
          <App />
        </Provider>
      </ScrollToTop>
    </HashRouter>
  </BrowserRouter>,
  document.getElementById("root")
);
