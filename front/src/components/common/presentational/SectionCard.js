import {useEffect, useState} from "react";

import {SectionTitle} from ".";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const SectionCard = ({
    title = "",
    headerActions = [],
    handleSidebarOpen = null,
    ...props
}) => {
    const [activeActions, setActiveActions] = useState([]);

    useEffect(() => {
        if (headerActions) {
            let action = {};
            let actions = [];
            if (headerActions.includes("add")) {
                action = {
                    icon: <AddCircleOutlineIcon />,
                    buttonAction: "add",
                    tooltipTitle: "Añadir nuevo",
                };
                actions.push(action);
            }
            if (headerActions.includes("edit")) {
                action = {
                    icon: <EditIcon />,
                    buttonAction: "edit",
                    tooltipTitle: "Modificar",
                };
                actions.push(action);
            }
            setActiveActions(actions);
        }
    }, []);

    const handleClick = event => {
        let buttonName = event.currentTarget.name;
        handleSidebarOpen(title, buttonName);
    };

    const headerButtons = activeActions.map(({buttonAction, tooltipTitle, icon}) => {
        return (
            <Tooltip key={buttonAction} title={tooltipTitle}>
                <IconButton
                    aria-label={buttonAction}
                    name={buttonAction}
                    onClick={handleClick}
                >
                    {icon}
                </IconButton>
            </Tooltip>
        );
    });

    return (
        <Card
            sx={{
                overflow: "auto",
            }}
        >
            <CardHeader
                title={<SectionTitle>{title}</SectionTitle>}
                action={<CardActions disableSpacing>{headerButtons}</CardActions>}
            />
            <CardContent>{props.children}</CardContent>
        </Card>
    );
};

export default SectionCard;
