import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./services/i18next/i18next";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import View from "./view/View";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <View />
    </PersistGate>
  </Provider>
);
