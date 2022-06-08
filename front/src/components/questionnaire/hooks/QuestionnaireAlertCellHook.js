export function useAlertCellStyle() {
    let getAlertCellStyle = condition => {
        console.log({condition});
        return {
            color: theme =>
                condition
                    ? theme.palette["success"]["light"]
                    : theme.palette["error"]["light"],
        };
    };

    return getAlertCellStyle;
}
