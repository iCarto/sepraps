import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const NoDataContainer = ({text, button}) => {
    return (
        <Stack alignItems="center" spacing={2}>
            <Typography style={{fontStyle: "italic"}}>{text}</Typography>
            {button}
        </Stack>
    );
};

export default NoDataContainer;
