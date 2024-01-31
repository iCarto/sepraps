import {ImagePreview} from "base/image/components";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const ProjectListItemButton = ({item}) => {
    return (
        <ListItemButton>
            <ListItemAvatar>
                <Avatar
                    alt={`Proyecto ${item.code}`}
                    src={`/static/images/avatar/${item + 1}.jpg`}
                >
                    <ImagePreview
                        path={item.featured_image}
                        alt={item.name}
                        width="50px"
                        height="50px"
                    />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                id={item.id}
                primary={
                    <Typography
                        sx={{display: "inline"}}
                        component="span"
                        fontWeight={600}
                    >
                        {item.name}{" "}
                    </Typography>
                }
                secondary={
                    <>
                        <Typography
                            sx={{display: "inline"}}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {item.location}
                        </Typography>
                        — {item.code}
                    </>
                }
            />
        </ListItemButton>
    );
};

export default ProjectListItemButton;
