import {SectionSubheading} from "components/common/presentational";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

const RecentProjectsList = ({projects}) => {
    const projectBtnStyle = {
        display: "flex",
        flexDirection: "column",
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
                    flexWrap: {xs: "wrap", xl: "noWrap"},
                    p: 1,
                    pt: 0,
                }}
            >
                {projects.map((project, index) => (
                    <ListItem key={index} sx={{pt: {xs: 1, xl: 0}, px: 1}}>
                        <ListItemButton sx={projectBtnStyle}>
                            <ListItemAvatar
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mr: 0,
                                    pr: 0,
                                }}
                            >
                                <Avatar
                                    src={project.featured_image}
                                    sx={{boxShadow: 1}}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={project.name}
                                secondary={project.code}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};

export default RecentProjectsList;
