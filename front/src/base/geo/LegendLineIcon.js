import PowerInputIcon from "@mui/icons-material/PowerInput";

const LegendLineIcon = ({color, dashed = false, size = 30}) => {
    let sx = {
        color: color,
        fontSize: size - 2 + "px",
    };
    // Adjust the viewbox and margins so only the solid or the dashed line is visible
    if (dashed) {
        sx["marginBottom"] = "-" + size * 0.75 + "px";
    } else {
        sx["marginTop"] = "-" + size * 0.5 + "px";
    }
    let viewBox = dashed
        ? "-1 " + size * 0.8 + " " + size * 0.8 + " 1"
        : "-1 0 " + size * 0.8 + " 1";
    return (
        <div
            style={{
                margin: "1px 0px",
                height: size + "px",
                width: size + "px",
            }}
        >
            <PowerInputIcon sx={sx} viewBox={viewBox} />
        </div>
    );
};

export default LegendLineIcon;
