import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import HeaderProvider from "./context/HeaderContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <HeaderProvider>
      <React.StrictMode>
      <App />
      </React.StrictMode>
    </HeaderProvider>
);
