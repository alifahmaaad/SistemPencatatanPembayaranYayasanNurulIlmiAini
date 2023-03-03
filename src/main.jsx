import React from "react";
import ReactDOM from "react-dom/client";
import { ProSidebarProvider } from "react-pro-sidebar";
import App from "./App";
import "./style.css";
import { Provider } from "react-redux";
import Store from "./Redux/Store/Store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </Provider>
  </React.StrictMode>
);
