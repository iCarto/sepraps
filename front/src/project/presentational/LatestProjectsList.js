import {useNavigate} from "react-router-dom";

import {SectionSubheading} from "base/section/components";
import {ImagePreview} from "base/image/components";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

const LatestProjectsList = ({projects}) => {
    const navigate = useNavigate();

    const projectBtnStyle = {
        display: "flex",
        flexDirection: "column",
        minHeight: "152px",
        boxShadow: 1,
        borderRadius: "4px",
        "&:hover": {
            backgroundColor: "primary.hover",
        },
    };

    return (
        <Card variant="outlined">
            <CardHeader
                title={<SectionSubheading heading="Proyectos" />}
                sx={{pb: 0}}
            />
            <List
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: {xs: "wrap", md: "noWrap"},
                    p: 1,
                    pt: 0,
                }}
            >
                {projects.map((project, index) => (
                    <ListItem key={index} sx={{pt: {xs: 1, xl: 0}, px: 1}}>
                        <ListItemButton
                            sx={projectBtnStyle}
                            onClick={() => {
                                navigate(`projects/${project.id}/summary`);
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
                                    sx={{width: "50px", height: "50px", boxShadow: 1}}
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
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};

export default LatestProjectsList;
