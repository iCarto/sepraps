import {styled} from "@mui/material/styles";

const TimelinePhase = styled("li")(({phase, theme}) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
    position: "relative",
    alignItems: "center",
    height: "40px",
    background: `${theme.palette[phase].light}`,
    padding: "10px 0",
    borderTop: `2px solid ${theme.palette[phase].lighter}`,
    borderBottom: `2px solid ${theme.palette[phase].lighter}`,
}));

const TimelinePhaseName = styled("span")(() => ({
    position: "absolute",
    bottom: "40px",
    fontSize: "12px",
    lineHeight: "1",
    paddingLeft: "3px",
    color: "grey",
    textTransform: "uppercase",
}));

const TimelineBase = styled("ul")(() => ({
    display: "flex",
    flexWrap: "wrap",
    padding: 0,
    height: "10px",
    listStyle: "none",
    background: "#e0e0e0",
}));

const MilestoneTimelinePhase = ({phase = "", milestones}) => {
    let phaseName;

    switch (`${phase}`) {
        case "phaseOne":
            phaseName = "Diseño";
            break;
        case "phaseTwo":
            phaseName = "Contratación";
            break;
        case "phaseThree":
            phaseName = "Ejecución";
            break;
        case "phaseFour":
            phaseName = "Post-construcción";
            break;

        default:
            break;
    }

    return (
        <>
            <TimelinePhase phase={phase}>
                <TimelinePhaseName>{phaseName}</TimelinePhaseName>
                <TimelineBase>{milestones}</TimelineBase>
            </TimelinePhase>
        </>
    );
};

export default MilestoneTimelinePhase;
