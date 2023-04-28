import Alert from "@mui/material/Alert";
import styled from "@mui/material/styles/styled";
import ErrorUtil from "../utilities/ErrorUtil";

const AlertStyled = styled(Alert)(({theme}) => ({
    whiteSpace: "pre-line",
}));

const AlertError = ({error, ...props}) => {
    return error ? (
        <AlertStyled severity="error" {...props} sx={{width: "100%"}}>
            {ErrorUtil.getMessage(error)}
        </AlertStyled>
    ) : null;
};

export default AlertError;
