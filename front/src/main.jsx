import {createRoot} from "react-dom/client";
import "./App.css";
import App from "./App";

import GA4React from "ga-4-react";
import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";
import {CaptureConsole as CaptureConsoleIntegration} from "@sentry/integrations";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);

if (process.env.REACT_APP_GOOGLE_ANALYTICS_CODE) {
    try {
        setTimeout(_ => {
            const ga4react = new GA4React(process.env.REACT_APP_GOOGLE_ANALYTICS_CODE);
            ga4react
                .initialize()
                .then(ga4 => {
                    ga4.pageview("path");
                    ga4.gtag("event", "pageview", "path"); // or your custom gtag event
                })
                .catch(err => console.error(err));
        }, 4000);
    } catch (err) {
        console.error(err);
    }
}

if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        integrations: [
            new BrowserTracing(),
            new CaptureConsoleIntegration({levels: ["warn", "error"]}),
        ],

        // performance
        tracesSampleRate: 0.05,

        // errors
        sampleRate: 1.0,

        //release:
        environment: "production",
    });
}
