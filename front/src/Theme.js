import createTheme from "@mui/material/styles/createTheme";

import {HEADER_HEIGHT} from "base/ui/app/config/measurements";

import teal from "@mui/material/colors/teal";
import grey from "@mui/material/colors/grey";

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
        success: CUSTOM_COLORS.success,
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
                    background: "#f5f5f5",
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
                        border: 0,
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
