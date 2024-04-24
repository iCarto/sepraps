import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const FormInputLabel = ({name, label, tooltipText = null}) => {
    return (
        <InputLabel id={`${name}-label`} shrink>
            <Box display="flex" alignItems="center">
                {label}
                {tooltipText && (
                    <Tooltip title={tooltipText} arrow enterDelay={500}>
                        <InfoOutlinedIcon
                            fontSize="small"
                            sx={{mx: 1, color: "grey.500"}}
                        />
                    </Tooltip>
                )}
            </Box>
        </InputLabel>
    );
};

export default FormInputLabel;
