import {SELECTOR_RIGHT_PANEL_WIDTH} from "base/ui/app/config/measurements";

import {PaperContainer} from "base/shared/components";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const SubpageWithSelectorContainer = ({
    itemSelector = null,
    itemsName = "",
    selectorSize = 2,
    noItems = false,
    children = null,
}) => {
    return (
        <Grid container spacing={1} wrap="nowrap" sx={{overflow: "auto"}}>
            <Grid item xs>
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
