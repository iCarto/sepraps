import {useNavigate} from "react-router";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const ListSelector = ({
    title,
    items,
    renderItem,
    basePath = null,
    showNewButton = true,
}) => {
    const navigate = useNavigate();

    console.log({items});

    return (
        <Box
            sx={{
                p: 1,
                backgroundColor: "grey.50",
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
                    borderColor: "grey.400",
                    backgroundColor: "grey.300",
                    borderRadius: 1,
                    maxHeight: "600px",
                    overflow: "auto",
                }}
            >
                {items &&
                    items.map((item, index) => (
                        <>
                            {index != 0 && <Divider />}
                            {renderItem(item)}
                        </>
                    ))}
            </List>
        </Box>
    );
};

export default ListSelector;
