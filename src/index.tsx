import React from "react";
import ReactDOM from "react-dom/client";
import "./resources/index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./routes/app";
import Version2 from "./routes/v2";
import { Playground } from "./routes/play";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const useRouter = false;

if (!useRouter) {
    const playground = false;
    
    if (playground) {
        root.render(<Playground />);
    } else {
        root.render(<Version2 />);
    }
    
    reportWebVitals();
}

if (useRouter) {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<App />} />
                    <Route path={"/v2"} element={<Version2 />} />
                    <Route path={"/playround"} element={<Playground />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>,
    );
    
    reportWebVitals();
}
