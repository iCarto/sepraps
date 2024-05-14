import {ImagePreview} from "base/image/components";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const ProjectListItemButton = ({item}) => {
    console.log({item});
    return (
        <ListItemButton>
            <ListItemAvatar>
                <Stack alignItems="center" sx={{mr: 1}}>
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
                    <Typography
                        component="span"
                        variant="caption"
                        fontSize={9}
                        color="grey.500"
                        sx={{mt: 1}}
                    >
                        {item.code}
                    </Typography>
                </Stack>
            </ListItemAvatar>
            <ListItemText
                id={item.id}
                primary={
                    <Typography
                        sx={{display: "inline"}}
                        component="span"
                        fontWeight={600}
                    >
                        {item.name}
                    </Typography>
                }
                secondary={
                    <Stack>
                        <Typography
                            sx={{display: "inline"}}
                            component="span"
                            variant="body2"
                        >
                            {item.location}
                        </Typography>
                        <Stack>
                            {item.project_works.map(work => (
                                <Typography variant="caption" color="grey.500">
                                    {`${work.work_type_label} (${work.work_class_label})`}
                                </Typography>
                            ))}
                        </Stack>
                    </Stack>
                }
            />
        </ListItemButton>
    );
};

export default ProjectListItemButton;
