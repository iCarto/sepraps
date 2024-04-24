import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const BuildingComponentListItemButton = ({item}) => {
    const displayCodeLabel =
        item.building_component.name !== item.building_component.code_label;

    return (
        <ListItemButton>
            <ListItemText
                id={item.id}
                primary={
                    <Typography sx={{display: "inline"}} component="span">
                        {item.building_component.name}{" "}
                    </Typography>
                }
                secondary={
                    displayCodeLabel ? `— ${item.building_component.code_label}` : null
                }
            />
        </ListItemButton>
    );
};

export default BuildingComponentListItemButton;
