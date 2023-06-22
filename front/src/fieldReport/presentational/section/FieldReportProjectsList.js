import {useAuth} from "base/user/provider";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const FieldReportProjectsList = ({projects, contract, onView, onEdit, onDelete}) => {
    const {ROLES} = useAuth();

    const handleClickView = projectIndex => {
        onView(projectIndex);
    };

    const handleClickEdit = projectIndex => {
        onEdit(projectIndex);
    };

    const handleClickDelete = projectIndex => {
        onDelete(projectIndex);
    };

    return (
        <List sx={{py: 0}}>
            {projects.map((project, index) => {
                return project.contract === contract ? (
                    <ListItem
                        key={project.id}
                        sx={{
                            display: "block",
                            p: 0,
                            pt: index === 0 ? 0 : 2,
                        }}
                    >
                        <Typography variant="h5" component="h2" fontWeight="500">
                            {`${project.locality}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                            {`${project.code} | ${project.district} (${project.department})`}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            {project.history}
                        </Typography>
                        <Stack flexDirection="row" justifyContent="flex-end">
                            <IconButton
                                aria-label="ver"
                                onClick={() => handleClickView(project.id)}
                            >
                                <VisibilityIcon
                                    fontSize="small"
                                    sx={{border: "1 solid black"}}
                                />
                            </IconButton>
                            <IconButton
                                aria-label="modificar"
                                onClick={() => handleClickEdit(project.id)}
                            >
                                <EditIcon
                                    fontSize="small"
                                    sx={{border: "1 solid black"}}
                                />
                            </IconButton>
                            <IconButton
                                aria-label="eliminar"
                                onClick={() => handleClickDelete(project.id)}
                            >
                                <DeleteIcon
                                    fontSize="small"
                                    sx={{border: "1 solid black"}}
                                />
                            </IconButton>
                        </Stack>
                    </ListItem>
                ) : null;
            })}
        </List>
    );
};

export default FieldReportProjectsList;
