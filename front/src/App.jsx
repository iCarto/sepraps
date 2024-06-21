import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {theme} from "./Theme";

import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from "date-fns/locale/es";

import CssBaseline from "@mui/material/CssBaseline";
import {SeprapsRoutes} from "sepraps/routes";
import {Lingui18NProvider} from "base/i18n/lingui";

function App() {
    return (
        <Lingui18NProvider>
            <ThemeProvider theme={theme}>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={esLocale}
                >
                    <CssBaseline>
                        <div className="App">
                            <SeprapsRoutes />
                        </div>
                    </CssBaseline>
                </LocalizationProvider>
            </ThemeProvider>
        </Lingui18NProvider>
    );
}

export default App;
