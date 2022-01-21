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
            light: "#538bdc",
            main: "#025eaa",
            dark: "#00357a",
            contrastText: "#fff",
        },
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
