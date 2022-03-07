import styled from "@mui/material/styles/styled";

const TimelinePhase = styled("li")(({phase, theme}) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
    position: "relative",
    alignItems: "center",
    height: "40px",
    padding: "10px 0",
}));

const TimelinePhaseName = styled("span")(({phase, theme}) => ({
    position: "absolute",
    bottom: "40px",
    fontSize: "12px",
    lineHeight: "1",
    paddingLeft: "3px",
    color: `${theme.palette[phase].dark}`,
    textTransform: "uppercase",
}));

const TimelineBase = styled("ul")(({phase, theme}) => ({
    display: "flex",
    padding: 0,
    height: "2px",
    listStyle: "none",
    backgroundColor: `${theme.palette[phase].dark}`,
}));

const MilestoneTimelinePhase = ({phase = "", milestones}) => {
    let phaseName;

    switch (`${phase}`) {
        case "design":
            phaseName = "Diseño";
            break;
        case "contracting":
            phaseName = "Contratación";
            break;
        case "execution":
            phaseName = "Ejecución";
            break;
        case "post-execution":
            phaseName = "Post-construcción";
            break;

        default:
            break;
    }

    return (
        <>
            <TimelinePhase phase={phase}>
                <TimelinePhaseName phase={phase}>{phaseName}</TimelinePhaseName>
                <TimelineBase phase={phase}>{milestones}</TimelineBase>
            </TimelinePhase>
        </>
    );
};

export default MilestoneTimelinePhase;
