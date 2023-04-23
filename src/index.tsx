import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_ar from "./asstes/local/ar/common.json";
import common_en from "./asstes/local/en/common.json";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: localStorage.getItem("lang") || "en", // default language
  resources: {
    en: {
      common: common_en,
    },
    ar: {
      common: common_ar,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <Suspense fallback="...loading">
            <App />
          </Suspense>
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
