export function useExpectedCellStyle() {
    let expectedCellStyle = {
        backgroundColor: theme => theme.palette["grey"]["50"],
        color: theme => theme.palette["grey"]["700"],
        fontStyle: "italic",
    };

    return expectedCellStyle;
}
