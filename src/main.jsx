import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/theme.css";

// This is the ONE place we render the app.
// Everything else is composition from here down — that's "Thinking in React".
//
// HashRouter is used instead of BrowserRouter so routes work reliably on
// GitHub Pages (which only serves static files and has no server-side
// rewrite rules for SPA deep links). URLs look like /#/deals instead of
// /deals.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
