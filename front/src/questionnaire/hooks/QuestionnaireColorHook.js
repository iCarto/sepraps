const questionnaireColors = {
    real: {
        main: "#5B9BD5",
        lightest: "#EFF5FB",
        light: "#AECDEA",
        dark: "#2E72B2",
    },
    expected: {
        main: "#ED7D31",
        lightest: "#FDF3EC",
        light: "#F5B88E",
        dark: "#CE5D12",
    },
    extended: {
        main: "#8B6A36",
        lightest: "#F9F6F0",
        light: "#CCAD7B",
        dark: "#765A2E",
    },
};

export function useQuestionnaireColors() {
    const getCellStyle = cellType => {
        if (!cellType) {
            return {};
        }
        return {
            backgroundColor: questionnaireColors[cellType].lightest,
            color: theme => questionnaireColors[cellType].dark,
        };
    };

    const getColor = type => {
        return questionnaireColors[type];
    };

    const COLORS = {
        REAL: "real",
        EXPECTED: "expected",
        EXTENDED: "extended",
    };

    return {getCellStyle, getColor, COLORS};
}
