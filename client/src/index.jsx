import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import "./index.scss";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import store, { persistor } from "./store/store";
import "../src/services/i18next/i18next";
import { Toaster } from "react-hot-toast";
import View from "./view/View";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const root = ReactDOM.hydrateRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Toaster />
          <View />
        </Router>
      </PersistGate>
    </Provider>
  </HelmetProvider>
);
