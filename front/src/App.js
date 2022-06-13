import {AppRoutes} from "routes";

import {ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import esLocale from "date-fns/locale/es";

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#025eaa",
            light: "#538bdc",
            lighter: "#ddebff",
            dark: "#00357a",
            contrastText: "#fff",
            hover: "#f5f9fc",
        },
        // COLORS FOR PROJECT PHASES
        design: {
            // ORANGE
            main: "#ff9800",
            light: "#ffefc2",
            lighter: "#ffefc2",
            dark: "#b26a00",
        },
        contracting: {
            // YELLOW
            main: "#fdd835",
            light: "#fff391",
            lighter: "#fffacf",

            dark: "#b2a429",
        },
        execution: {
            // LIME
            main: "#c0ca33",
            light: "#e3eb90",
            lighter: "#f3f6cf",

            dark: "#8f9a27",
        },
        "post-execution": {
            // GREEN
            main: "#8bc34a",
            light: "#bedd9a",
            lighter: "#dcedc8",

            dark: "#618833",
        },
        other: {
            // RED
            main: "#ff0a0a",
            light: "#f2aeae",
            dark: "#aa2e25",
        },
        pageBackground: "#e0e0e0",
    },
});

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <LocalizationProvider dateAdapter={DateAdapter} locale={esLocale}>
                <CssBaseline>
                    <div className="App">
                        <AppRoutes />
                    </div>
                </CssBaseline>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
