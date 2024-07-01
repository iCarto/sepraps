import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const SeprapsHelp = () => {
    return (
        <Tooltip title="Manual de Ayuda">
            <IconButton
                onClick={() => window.open("/help/manual_ayuda.pdf", "_blank")}
                sx={{
                    width: 40,
                    height: 40,
                    ml: 1,
                    mr: 1,
                }}
            >
                <HelpOutlineOutlinedIcon sx={{fontSize: 35, color: "secondary.main"}} />
            </IconButton>
        </Tooltip>
    );
};

export default SeprapsHelp;
