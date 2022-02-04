import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

const ButtonLink = ({text, to}) => {
    return (
        <Button component={Link} to={to}>
            {text}
        </Button>
    );
};

export default ButtonLink;
