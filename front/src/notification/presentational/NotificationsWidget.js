import {Fragment, useState} from "react";
import {useNavigate} from "react-router-dom";

import {ContainerGridWithBorder} from "base/ui/section/components";
import {LightHeading} from "base/ui/headings/components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleIcon from "@mui/icons-material/Circle";

const NotificationsWidget = ({notifications}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const recordsPerPage = 4;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = notifications.slice(indexOfFirstRecord, indexOfLastRecord);

    const numberOfPages = Math.ceil(notifications.length / recordsPerPage);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const buttonStyle = {
        py: {xs: 0, xl: "inherit"},
        "&:hover": {
            backgroundColor: "primary.hover",
        },
    };

    return (
        <ContainerGridWithBorder p={4}>
            <LightHeading>Notificaciones ({notifications.length})</LightHeading>
            {notifications.length ? (
                <List sx={{width: "100%", px: 0}} dense>
                    {currentRecords?.map(notification => {
                        return (
                            <Fragment key={notification.id}>
                                <ListItem alignItems="flex-start" sx={{px: 0}}>
                                    <ListItemButton
                                        sx={buttonStyle}
                                        onClick={() => {
                                            navigate(`${notification.url}`);
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{minWidth: "40px", mt: "10px"}}
                                        >
                                            <CircleIcon
                                                fontSize="small"
                                                sx={{
                                                    color:
                                                        notification.severity ===
                                                        "warning"
                                                            ? `${notification.severity}.light`
                                                            : `${notification.severity}.main`,
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primaryTypographyProps={{
                                                fontWeight: "medium",
                                            }}
                                            primary={notification.title}
                                            secondary={notification.message}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <Divider
                                    variant="inset"
                                    component="li"
                                    sx={{ml: "64px"}}
                                />
                            </Fragment>
                        );
                    })}
                    {numberOfPages > 1 && (
                        <Pagination
                            count={numberOfPages}
                            page={currentPage}
                            onChange={handleChange}
                            sx={{mt: 3, ml: 2}}
                        />
                    )}
                </List>
            ) : (
                <Typography>No hay notificaciones para mostrar</Typography>
            )}
        </ContainerGridWithBorder>
    );
};

export default NotificationsWidget;
