import {Fragment} from "react";
import {SectionCard} from "components/common/presentational";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleIcon from "@mui/icons-material/Circle";

const NotificationsWidget = ({notifications}) => {
    const btnStyle = {
        "&:hover": {
            backgroundColor: "primary.hover",
        },
    };

    return (
        <SectionCard headingLabel={null} title="Notificaciones">
            <List sx={{width: "100%", pr: 2, pt: 0, mt: -2}}>
                {notifications.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <ListItem alignItems="flex-start" sx={{pl: "8px"}}>
                                <ListItemButton sx={btnStyle}>
                                    <ListItemIcon sx={{minWidth: "40px", mt: "10px"}}>
                                        <CircleIcon
                                            fontSize="small"
                                            color={item.notificationColor}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primaryTypographyProps={{fontWeight: "medium"}}
                                        primary={item.name}
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{display: "inline"}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {item.notificationDate}
                                                </Typography>
                                                {` — ${item.notificationMessage}`}
                                            </>
                                        }
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
