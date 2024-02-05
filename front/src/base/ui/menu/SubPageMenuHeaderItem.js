import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

const SubPageMenuHeaderItem = ({
    title = "",
    primary = null,
    secondary = null,
    body = null,
    tag = null,
    action = null,
}) => {
    return (
        <Stack sx={{bgcolor: "white", border: "none", px: "5px"}}>
            <Stack direction="row" alignItems="center">
                <Typography
                    sx={{
                        textTransform: "uppercase",
                        fontSize: "0.8em",
                        pt: 0,
                    }}
                >
                    {title}
                </Typography>
                {action && <Box sx={{marginLeft: "auto"}}>{action}</Box>}
            </Stack>
            <Stack
                sx={{
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                }}
                spacing={0.5}
            >
                {primary && (
                    <Typography
                        sx={{
                            pt: 1,
                            fontSize: 20,
                            fontWeight: 800,
                            lineHeight: 1.25,
                        }}
                    >
                        {primary}
                    </Typography>
                )}
                {secondary && (
                    <Typography
                        sx={{
                            fontSize: "0.8em",
                            opacity: 0.8,
                        }}
                    >
                        {secondary}
                    </Typography>
                )}
                <Typography>{body}</Typography>
                {tag && <Box>{tag}</Box>}
            </Stack>
        </Stack>
    );
};

export default SubPageMenuHeaderItem;
