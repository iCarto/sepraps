import {useNavigate} from "react-router-dom";

import {ContainerGridWithBorder} from "base/ui/section/components";
import {LightHeading} from "base/ui/headings/components";
import {ImagePreview} from "base/image/components";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import {theme} from "Theme";

const LatestProjectsList = ({projects}) => {
    const navigate = useNavigate();

    const projectButtonStyle = {
        display: "flex",
        flexDirection: "column",
        minHeight: "152px",
        border: 1,
        borderColor: "primary.dark",
        boxShadow: 1,
        borderRadius: "4px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
    };

    return (
        <ContainerGridWithBorder p={4}>
            <LightHeading>Últimos proyectos modificados</LightHeading>
            <List
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: {xs: "wrap", md: "noWrap"},
                    width: "100%",
                    px: 0,
                    pb: 0,
                }}
            >
                {projects.map((project, index) => (
                    <ListItem key={index} sx={{pr: 0, pb: 0, pl: index === 0 ? 0 : 2}}>
                        <ListItemButton
                            sx={projectButtonStyle}
                            onClick={() => {
                                navigate(`projects/list/${project.id}`);
                            }}
                        >
                            <ListItemAvatar
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mr: 0,
                                    pr: 0,
                                    pt: 1,
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: "50px",
                                        height: "50px",
                                        boxShadow: 1,
                                    }}
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
                                primary={project.name}
                                secondary={project.code}
                                primaryTypographyProps={{
                                    textAlign: "center",
                                    lineHeight: 1.25,
                                }}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    mt: 1.5,
                                    mb: 0,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </ContainerGridWithBorder>
    );
};

export default LatestProjectsList;
