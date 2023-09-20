import {useState, useEffect} from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

const LayerMenuLegendItem = ({icon = null, text = null, toggleFn = null}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (toggleFn != null) {
            toggleFn(visible);
        }
    }, [visible]);

    return (
        <ListItem disablePadding className="LayerMenuLegendItem">
            {toggleFn && (
                <IconButton
                    onClick={e => {
                        setVisible(!visible);
                    }}
                    className="LayerMenuLegendItemButton"
                >
                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
            )}
            {icon && <div className="LayerMenuLegendItemIcon">{icon}</div>}
            {text && (
                <ListItemText primary={text} className="LayerMenuLegendItemText" />
            )}
        </ListItem>
    );
};

export default LayerMenuLegendItem;
