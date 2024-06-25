// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/sotre";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./i18n/i18n.ts";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      {/* <React.StrictMode> */}
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
      {/* </React.StrictMode> */}
    </GoogleOAuthProvider>
    ;
  </Provider>
);
