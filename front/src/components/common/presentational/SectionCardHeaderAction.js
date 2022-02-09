import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const SectionCardHeaderAction = ({name, title, icon, onClick}) => {
    return (
        <Tooltip key={name} title={title}>
            <IconButton aria-label={name} name={name} onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    );
};

export default SectionCardHeaderAction;
