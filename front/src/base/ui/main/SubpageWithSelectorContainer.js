import {SELECTOR_RIGHT_PANEL_WIDTH} from "base/ui/app/config/measurements";

import {PaperContainer} from "base/shared/components";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const SubpageWithSelectorContainer = ({
    itemSelector = null,
    itemsName = "",
    selectorSize = 2,
    noItems = false,
    newItems = null,
    children = null,
}) => {
    return (
        <Grid container spacing={1} wrap="nowrap" sx={{overflow: "auto"}}>
            <Grid item xs>
                {children}
                {noItems && (
                    <PaperContainer>
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            my={6}
                            spacing={2}
                            sx={{width: "100%"}}
                        >
                            <Typography
                                sx={{
                                    fontStyle: "italic",
                                }}
                            >
                                No hay {itemsName} para mostrar.
                            </Typography>
                            {newItems}
                        </Stack>
                    </PaperContainer>
                )}
            </Grid>
            <Grid
                item
                xs={selectorSize}
                sx={{minWidth: `${SELECTOR_RIGHT_PANEL_WIDTH}px`}}
            >
                {itemSelector}
            </Grid>
        </Grid>
    );
};

export default SubpageWithSelectorContainer;
