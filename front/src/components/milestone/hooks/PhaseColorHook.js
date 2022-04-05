import {useTheme} from "@emotion/react";

export function usePhaseColor() {
    const theme = useTheme();

    let getPhaseColor = phase => {
        return theme.palette[phase].main;
    };

    return getPhaseColor;
}
