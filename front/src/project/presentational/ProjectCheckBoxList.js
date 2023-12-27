import {ImagePreview} from "base/image/components";
import {EntityNoItemsComponent} from "base/entity/components/presentational";

import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const ProjectCheckBoxList = ({checked, projects, onCheck}) => {
    const handleToggle = clickedItemId => () => {
        const currentIndex = checked.indexOf(clickedItemId);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(clickedItemId);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        onCheck(newChecked);
    };

    return !projects.length ? (
        <EntityNoItemsComponent isFilterEmpty={false} />
    ) : (
        <List dense sx={{width: "100%", bgcolor: "background.paper"}}>
            {projects.map(project => {
                const labelId = `projects-checkbox-list-${project.code}`;
                return (
                    <ListItem
                        key={project.id}
                        onClick={handleToggle(project.id)}
                        secondaryAction={
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(project.id)}
                                checked={checked.indexOf(project.id) !== -1}
                                inputProps={{"aria-labelledby": labelId}}
                            />
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Proyecto ${project.code}`}
                                    src={`/static/images/avatar/${project + 1}.jpg`}
                                >
                                    <ImagePreview
                                        path={project.featured_image}
                                        alt={project.name}
                                        width="50px"
                                        height="50px"
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                id={labelId}
                                primary={
                                    <Typography
                                        sx={{display: "inline"}}
                                        component="span"
                                        fontWeight={600}
                                    >
                                        {project.name}{" "}
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
                                            {project.location}
                                        </Typography>
                                        — {project.code}
                                    </>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default ProjectCheckBoxList;
