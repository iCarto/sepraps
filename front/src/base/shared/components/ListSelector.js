import {useNavigate} from "react-router";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Box from "@mui/material/Box";

const ListSelector = ({
    title,
    items,
    renderItem,
    basePath = null,
    showNewButton = true,
}) => {
    const navigate = useNavigate();

    return (
        <Paper
            elevation={3}
            sx={{
                p: 1,
                backgroundColor: "grey.100",
                borderRadius: 1,
            }}
        >
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{px: 3}}
            >
                <Typography color="primary.main" sx={{textTransform: "uppercase"}}>
                    {title}
                </Typography>
                {showNewButton && (
                    <IconButton
                        aria-label="add-new-button"
                        color="primary"
                        size="large"
                        onClick={() => {
                            navigate(`${basePath}/new`);
                        }}
                    >
                        <Tooltip id="add-new-button-tooltip" title="Añadir nuevo">
                            <AddCircleOutlineOutlinedIcon fontSize="inherit" />
                        </Tooltip>
                    </IconButton>
                )}
            </Grid>
            <List
                sx={{
                    border: 1,
                    borderColor: "grey.300",
                    backgroundColor: "grey.200",
                    borderRadius: 1,
                    maxHeight: "600px",
                    overflow: "auto",
                    p: 0,
                }}
            >
                {items &&
                    items.map((item, index) => (
                        <Box key={item.id}>
                            {index != 0 && <Divider sx={{borderColor: "grey.200"}} />}
                            {renderItem(item)}
                        </Box>
                    ))}
            </List>
        </Paper>
    );
};

export default ListSelector;
