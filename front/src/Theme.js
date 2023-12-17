import createTheme from "@mui/material/styles/createTheme";

import {HEADER_HEIGHT} from "base/ui/app/config/measurements";

import teal from "@mui/material/colors/teal";
import grey from "@mui/material/colors/grey";
import amber from "@mui/material/colors/amber";
import red from "@mui/material/colors/red";
import orange from "@mui/material/colors/orange";
import lightGreen from "@mui/material/colors/lightGreen";
import yellow from "@mui/material/colors/yellow";
import brown from "@mui/material/colors/yellow";
import lime from "@mui/material/colors/lime";
import indigo from "@mui/material/colors/indigo";
import deepPurple from "@mui/material/colors/deepPurple";
import lightBlue from "@mui/material/colors/lightBlue";

// For the palette, only the "main" variant is required. If no other variant is provided, "dark" & "light" variants will be calculated by default through the createTheme method.
// Specific colors can be imported from the MUI color palettes https://mui.com/material-ui/customization/color/ to be used as objects containing all the different hues and shades of that specific palette.

// When no customTheme is available, just export defaultTheme empty object instead in order to use MUI default theme.
// const defaultTheme = {};
// export const theme = defaultTheme;

export const CUSTOM_FONT_FAMILY = "Roboto";

const customHeadingsStyle = {fontFamily: CUSTOM_FONT_FAMILY, fontWeight: "bold"};

// We are defining colors in a global variable so that we can use them in files other than React components (like hooks). If this was not needed, we would just define the colors inside the palette object.
export const CUSTOM_COLORS = {
    primary: {
        main: "#025eaa",
        light: "#538bdc",
        lighter: "#ddebff",
        dark: "#00357a",
        contrastText: "#fff",
        hover: "#f5f9fc",
    },
    secondary: {
        dark: "#002b4a",
        main: "#7FBCE1",
        light: "#BFDDF0",
        lighter: "#E5F1F8",
    },
    success: teal,
    error: {
        main: "#d32f2f",
        dark: "#c62828",
    },
    pageBackground: "#e0e0e0",
    text: {
        primary: "#283838",
    },
    grey: grey,
    white: "#fff",

    // COLORS FOR PROJECT PHASES
    design: orange,
    contracting: yellow,
    execution: lime,
    "post-execution": lightGreen,
    other: red,

    // COLORS FOR FINANCIAL MONITORING:
    paid: lightBlue,
    pending: amber,
    expected: orange,
    "monto-total": indigo,
};

const customTheme = createTheme({
    palette: {
        primary: {
            main: CUSTOM_COLORS.primary.main,
        },
        secondary: {
            dark: CUSTOM_COLORS.secondary.dark,
            main: CUSTOM_COLORS.secondary.main,
            light: CUSTOM_COLORS.secondary.light,
            lighter: CUSTOM_COLORS.secondary.lighter,
        },
        success: {
            main: CUSTOM_COLORS.success[600],
            light: CUSTOM_COLORS.success[200],
            lighter: CUSTOM_COLORS.success[100],
            dark: CUSTOM_COLORS.success[800],
        },
        error: {
            main: CUSTOM_COLORS.error.main,
            dark: CUSTOM_COLORS.error.dark,
        },
        pageBackground: CUSTOM_COLORS.pageBackground,
        white: CUSTOM_COLORS.white,
        text: {
            primary: CUSTOM_COLORS.text.primary,
        },
        menu: {
            primary: {
                header: {
                    background: "#efefef",
                    text: CUSTOM_COLORS.secondary.dark,
                },
                options: {
                    background: "#f5f5f",
                    text: "#7c8b95",
                },
            },
            secondary: {
                header: {
                    background: CUSTOM_COLORS.secondary.lighter,
                    text: CUSTOM_COLORS.secondary.dark,
                },
                options: {
                    background: CUSTOM_COLORS.white,
                    text: "#7c8b95",
                },
                background: "white",
            },
        },
        // COLORS FOR PROJECT PHASES
        design: {
            // ORANGE
            main: CUSTOM_COLORS.design[500],
            light: CUSTOM_COLORS.design[50],
            lighter: CUSTOM_COLORS.design[50],
            dark: "#b26a00",
        },
        contracting: {
            // YELLOW
            main: CUSTOM_COLORS.contracting[600],
            light: CUSTOM_COLORS.contracting[200],
            lighter: CUSTOM_COLORS.contracting[50],
            dark: "#b2a429",
        },
        execution: {
            // LIME
            main: CUSTOM_COLORS.execution[600],
            light: CUSTOM_COLORS.execution[200],
            lighter: CUSTOM_COLORS.execution[100],
            dark: CUSTOM_COLORS.execution[800],
        },
        "post-execution": {
            // LIGHT GREEN
            main: CUSTOM_COLORS["post-execution"][500],
            light: CUSTOM_COLORS["post-execution"][200],
            lighter: CUSTOM_COLORS["post-execution"][100],
            dark: CUSTOM_COLORS["post-execution"][800],
        },
        other: {
            // RED
            main: CUSTOM_COLORS.other[600],
            light: CUSTOM_COLORS.other[200],
            dark: CUSTOM_COLORS.other[800],
        },

        // COLORS FOR FINANCIAL MONITORING:
        paid: {
            main: CUSTOM_COLORS.paid[500],
            light: CUSTOM_COLORS.paid[300],
            lighter: CUSTOM_COLORS.paid[100],
            dark: CUSTOM_COLORS.paid[900],
        },
        pending: {
            main: CUSTOM_COLORS.pending[500],
            light: CUSTOM_COLORS.pending[300],
            lighter: CUSTOM_COLORS.pending[100],
            dark: CUSTOM_COLORS.pending[900],
        },
        expected: {
            main: CUSTOM_COLORS.expected[300],
            light: CUSTOM_COLORS.expected[100],
            lighter: CUSTOM_COLORS.expected[100],
            dark: CUSTOM_COLORS.expected[900],
        },
        "monto-total": {
            main: CUSTOM_COLORS["monto-total"][500],
            light: CUSTOM_COLORS["monto-total"][300],
            lighter: CUSTOM_COLORS["monto-total"][100],
            dark: CUSTOM_COLORS["monto-total"][900],
        },
    },

    // typography: {
    //     fontSize: 12,
    // },

    mixins: {
        toolbar: {
            minHeight: `${HEADER_HEIGHT}px`,
        },
    },

    components: {
        MuiTypography: {
            styleOverrides: {
                h1: customHeadingsStyle,
                h2: customHeadingsStyle,
                h3: customHeadingsStyle,
                h4: customHeadingsStyle,
                h5: customHeadingsStyle,
                h6: {...customHeadingsStyle, color: CUSTOM_COLORS.secondary.dark},
            },
        },

        MuiListItemButton: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        // <-- mixing the two classes
                        backgroundColor: CUSTOM_COLORS.secondary.light,
                    },
                },
            },
        },

        MuiTableRow: {
            styleOverrides: {
                root: {
                    "&:last-child td, &:last-child th": {
                        borderBottom: 0,
                    },
                },
            },
        },

        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    lineHeight: "1rem",
                },
            },
        },

        MuiFormControl: {
            styleOverrides: {
                root: {
                    marginTop: "8px",
                    marginBottom: "4px",
                },
            },
        },

        MuiInputBase: {
            styleOverrides: {
                input: {
                    fontSize: "14px",
                    backgroundColor: CUSTOM_COLORS.white,
                    "&::placeholder": {
                        opacity: 0.15,
                        fontStyle: "italic",
                    },
                },
            },
        },
    },
});

export const theme = customTheme;
