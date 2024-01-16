import {SELECTOR_RIGHT_PANEL_WIDTH} from "base/ui/app/config/measurements";

import {PaperContainer} from "base/shared/components";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const SubpageWithSelectorContainer = ({
    itemSelector = null,
    itemsName = "",
    noItems = false,
    children = null,
}) => {
    return (
        <Stack direction="row" spacing={2}>
            <Box
                sx={{
                    width: `calc(100% - ${SELECTOR_RIGHT_PANEL_WIDTH}px)`,
                }}
            >
                {children}
                {noItems && (
                    <PaperContainer>
                        <Grid container justifyContent="center" my={6}>
                            <Typography
                                sx={{
                                    fontStyle: "italic",
                                    textAlign: "center",
                                }}
                            >
                                No hay {itemsName} para mostrar.
                            </Typography>
                        </Grid>
                    </PaperContainer>
                )}
            </Box>
            <Box component="aside" sx={{width: `${SELECTOR_RIGHT_PANEL_WIDTH}px`}}>
                {itemSelector}
            </Box>
        </Stack>
    );
};

export default SubpageWithSelectorContainer;
