import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./Global/Store.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Context from "./Context/Context.jsx";
import { SidebarContext, SidebarProvider } from "./Context/sidebarContext.jsx";

let myPersistorVariable = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={myPersistorVariable}>
        <Context>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </Context>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
