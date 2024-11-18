import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import { useRouter } from "next/router";
import store, { persistor } from "../store/store";
import "../services/i18next/i18next";
// import "../styles/index.scss";

const App = ({ Component, pageProps }) => {
    // const router = useRouter();
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
};

export default App;
