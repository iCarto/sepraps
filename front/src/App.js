import {AppRoutes} from "routes";

import {ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
            <CssBaseline>
                <div className="App">
                    <AppRoutes />
                </div>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
