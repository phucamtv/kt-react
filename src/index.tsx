import React from "react";
import ReactDOM from "react-dom/client";
import "./resources/index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./routes/app";
import Version2 from "./routes/v2";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const useRouter = false;

if (!useRouter) {
    root.render(<Version2 />);
    
    reportWebVitals();
}

if (useRouter) {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<App />} />
                    <Route path={"/v2"} element={<Version2 />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>,
    );
    
    reportWebVitals();
}
