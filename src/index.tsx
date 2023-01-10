import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./resources/index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const App = lazy(() => import("./components/App"));
root.render(<App />);

reportWebVitals();
