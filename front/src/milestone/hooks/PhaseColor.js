import useTheme from "@mui/material/styles/useTheme";

export function usePhaseColor() {
    const theme = useTheme();

    let getPhaseColor = phase => {
        return theme.palette[phase].main;
    };

    return getPhaseColor;
}
