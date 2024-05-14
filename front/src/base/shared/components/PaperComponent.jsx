import Paper from "@mui/material/Paper";

const PaperComponent = ({children, ...props}) => {
    return (
        <Paper elevation={3} sx={{p: 2, height: "100%", width: "100%"}} {...props}>
            {children}
        </Paper>
    );
};

export default PaperComponent;
