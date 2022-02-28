import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const CustomTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} arrow classes={{popper: className}} />
))(({theme}) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: `${theme.palette.grey["700"]}`,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 220,
        textAlign: "center",
        backgroundColor: `${theme.palette.grey["700"]}`,
        boxShadow: theme.shadows[1],
        fontSize: 12,
    },
}));

const MilestoneTimelineTooltip = ({milestone, completionDate, children}) => {
    return (
        <CustomTooltip
            title={
                <>
                    <Typography>{milestone}</Typography>
                    {completionDate ? (
                        <Typography variant="caption">
                            Completado el {completionDate}
                        </Typography>
                    ) : (
                        <Typography variant="caption">
                            Pendiente de completar
                        </Typography>
                    )}
                </>
            }
        >
            {children}
        </CustomTooltip>
    );
};

export default MilestoneTimelineTooltip;
