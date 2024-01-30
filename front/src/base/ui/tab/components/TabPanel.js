import Box from "@mui/material/Box";

const TabPanel = props => {
    const {children, visible, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={!visible}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {visible && <Box sx={{pt: 1}}>{children}</Box>}
        </div>
    );
};

export default TabPanel;
