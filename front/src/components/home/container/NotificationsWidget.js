import {Fragment} from "react";
import {useNavigate} from "react-router-dom";

import {SectionCard} from "components/common/presentational";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleIcon from "@mui/icons-material/Circle";

const NotificationsWidget = ({notifications}) => {
    const navigate = useNavigate();

    const btnStyle = {
        "&:hover": {
            backgroundColor: "primary.hover",
        },
    };

    return (
        <SectionCard headingLabel={null} title="Notificaciones">
            <List sx={{width: "100%", pr: 2, pt: 0, mt: -2}}>
                {notifications.map(notification => {
                    return (
                        <Fragment key={notification.id}>
                            <ListItem alignItems="flex-start" sx={{pl: "8px"}}>
                                <ListItemButton
                                    sx={btnStyle}
                                    onClick={() => {
                                        navigate(`${notification.url}`);
                                    }}
                                >
                                    <ListItemIcon sx={{minWidth: "40px", mt: "10px"}}>
                                        <CircleIcon
                                            fontSize="small"
                                            color={notification.severity}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primaryTypographyProps={{fontWeight: "medium"}}
                                        primary={notification.title}
                                        secondary={notification.message}
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider variant="inset" component="li" sx={{ml: "64px"}} />
                        </Fragment>
                    );
                })}
            </List>
        </SectionCard>
    );
};

export default NotificationsWidget;
