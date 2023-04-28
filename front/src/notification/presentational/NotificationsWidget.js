import {Fragment, useState} from "react";
import {useNavigate} from "react-router-dom";

import {SectionCard} from "base/section/components";
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

    const btnStyle = {
        py: {xs: 0, xl: "inherit"},
        "&:hover": {
            backgroundColor: "primary.hover",
        },
    };

    return (
        <SectionCard headingLabel={null} title="Notificaciones">
            {notifications.length ? (
                <List sx={{width: "100%", pr: 1, pt: 0, mt: -2}}>
                    {currentRecords?.map(notification => {
                        return (
                            <Fragment key={notification.id}>
                                <ListItem alignItems="flex-start" sx={{pl: "8px"}}>
                                    <ListItemButton
                                        sx={btnStyle}
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
        </SectionCard>
    );
};

export default NotificationsWidget;
