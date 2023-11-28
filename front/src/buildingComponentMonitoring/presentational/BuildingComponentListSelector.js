import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import {BuildingComponentListSelectorItem} from ".";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const BuildingComponentListSelector = ({
    buildingComponents,
    selectedBuildingComponentId,
    basePath,
}) => {
    const navigate = useNavigate();
    const [buildingComponentsList, setBuildingComponentsList] = useState([]);

    useEffect(() => {
        setBuildingComponentsList(buildingComponents);
    }, [buildingComponents]);

    return (
        <Paper
            sx={{
                border: "1px",
                borderStyle: "solid",
                borderColor: "darkgray",
                p: 1,
                height: "calc(100vh - 180px)",
                overflow: "auto",
            }}
        >
            <Grid container justifyContent="space-around" alignItems="center">
                <Typography>Componentes:</Typography>
                <IconButton
                    aria-label="add-new-component-button"
                    color="primary"
                    size="large"
                    onClick={() => {
                        navigate(`${basePath}/new`);
                    }}
                >
                    <Tooltip
                        id="add-new-component-button-tooltip"
                        title="Añadir nuevo componente"
                    >
                        <AddCircleOutlineOutlinedIcon fontSize="inherit" />
                    </Tooltip>
                </IconButton>
            </Grid>
            <Divider />
            <List>
                {buildingComponentsList &&
                    buildingComponentsList.map(buildingComponent => (
                        <BuildingComponentListSelectorItem
                            key={buildingComponent.id}
                            buildingComponent={buildingComponent}
                            to={`${basePath}/${buildingComponent.id.toString()}`}
                            selected={
                                selectedBuildingComponentId === buildingComponent.id
                            }
                        />
                    ))}
            </List>
        </Paper>
    );
};

export default BuildingComponentListSelector;
