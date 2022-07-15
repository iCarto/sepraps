import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import GA4React from "ga-4-react";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

if (process.env.REACT_APP_GOOGLE_ANALYTICS_CODE) {
    try {
        setTimeout(_ => {
            const ga4react = new GA4React(process.env.REACT_APP_GOOGLE_ANALYTICS_CODE);
            ga4react
                .initialize()
                .then(g4 => {
                    ga4.pageview("path");
                    ga4.gtag("event", "pageview", "path"); // or your custom gtag event
                })
                .catch(err => console.error(err));
        }, 4000);
    } catch (err) {
        console.error(err);
    }
}
