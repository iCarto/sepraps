import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/material/Typography";

const FormInputLabelOffset = ({name, label, tooltipText = null}) => {
    return (
        <Box id={`${name}-label`} display="flex" alignItems="center" ml={1} py={0.5}>
            <Typography variant="caption" color="grey.700" lineHeight="1.30">
                {label}
            </Typography>
            {tooltipText && (
                <Tooltip title={tooltipText} arrow enterDelay={500}>
                    <InfoOutlinedIcon
                        fontSize="small"
                        sx={{mx: 1, color: "grey.500"}}
                    />
                </Tooltip>
            )}
        </Box>
    );
};

export default FormInputLabelOffset;
