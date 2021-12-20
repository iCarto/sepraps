import Typography from "@mui/material/Typography";
import {useOutletContext} from "react-router-dom";

const ViewProjectLocationSubPage = () => {
    const [project] = useOutletContext();
    // We can use "project" and his attributes passed in the outlet context
    // from the parent component without the need to search for them again.

    return <Typography>Ubicación</Typography>;
};

export default ViewProjectLocationSubPage;
