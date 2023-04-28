import {SeprapsRoutes} from "sepraps/routes";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import esLocale from "date-fns/locale/es";

import {theme} from "./Theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns} apterLocale={esLocale}>
                <CssBaseline>
                    <div className="App">
                        <SeprapsRoutes />
                    </div>
                </CssBaseline>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
