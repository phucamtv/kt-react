import React from "react";
import ReactDOM from "react-dom/client";
import "./resources/index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(<App />);
reportWebVitals();
