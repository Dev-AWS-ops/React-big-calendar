import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Get redirect param if coming from 404.html
const redirect = new URLSearchParams(window.location.search).get("redirect");
if (redirect) {
  window.history.replaceState(null, "", "/React-big-calendar" + redirect);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/React-big-calendar">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
