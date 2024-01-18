import {useOutletContext} from "react-router-dom";

import Stack from "@mui/material/Stack";

const ViewSocialComponentsOverview = () => {
    const {project, scMonitorings} = useOutletContext();

    return project && scMonitorings ? <Stack spacing={2}></Stack> : null;
};

export default ViewSocialComponentsOverview;
