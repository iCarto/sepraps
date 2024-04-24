import {useOutletContext} from "react-router-dom";

import {ContentLayout} from "base/ui/main";
import {AlertError} from "base/error/components";
import Grid from "@mui/material/Grid";

const EntityViewSubPage = ({
    sections = [],
    additionalContext = null,
    children = null,
    error = null,
}) => {
    const context = useOutletContext();

    const sectionsToDisplay = sections.map((section, index) => (
        <Grid item xs={12} key={index} id={`${index + 2}`}>
            {section}
        </Grid>
    ));

    return (
        <ContentLayout context={[...context, additionalContext]}>
            <AlertError error={error} />
            <Grid container display="flex" spacing={1}>
                {sections.length ? sectionsToDisplay : null}
                {children}
            </Grid>
        </ContentLayout>
    );
};

export default EntityViewSubPage;
