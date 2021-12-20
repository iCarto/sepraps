import {useState, useEffect, Fragment} from "react";
import {Outlet, useParams} from "react-router-dom";
import {ProjectService} from "service/api";
import {ProjectMenu} from "../presentational";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

const ViewProjectPage = () => {
    const {id} = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        ProjectService.getProject(id).then(data => {
            setProject(data);
        });
    }, [id]);

    return (
        project && (
            <Fragment>
                <ProjectMenu />
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    {
                        // Fixed header needs a fixed space between top margin and the top of the child component
                        // MUI examples add a empty toolbar to solve this problem
                        // TODO: Check if there is a good solution for this
                        <Toolbar />
                    }
                    <Typography variant="h3" gutterBottom component="div">
                        {project.name}
                    </Typography>
                    <Outlet context={[project]} />
                </Box>
            </Fragment>
        )
    );
};

export default ViewProjectPage;
