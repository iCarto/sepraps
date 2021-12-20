import {useState, useEffect} from "react";
import {ProjectService} from "service/api";
import {ProjectList} from "../presentational";
import Box from "@mui/material/Box";

const ListProjectsPage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        ProjectService.getProjects().then(data => {
            setProjects(data);
        });
    }, []);

    return (
        <Box component="main" sx={{flexGrow: 1, bgcolor: "background.default", p: 3}}>
            <ProjectList projects={projects} />
        </Box>
    );
};

export default ListProjectsPage;
