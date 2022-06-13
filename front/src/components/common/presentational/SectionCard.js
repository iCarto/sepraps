import {SectionHeading} from ".";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import SectionActionsMenu from "./SectionActionsMenu";

const SectionCard = ({
    isSidePanelOpen = null,
    headingLabel = true,
    title = "",
    secondaryActions = null,
    ...props
}) => {
    const cardStyle = {
        overflow: "auto",
        width: {xs: 0, sm: "20%", md: "40%", lg: "68%", xl: "100%"},
    };

    return (
        <Card
            sx={isSidePanelOpen === true ? cardStyle : {width: "100%"}}
            variant="outlined"
        >
            <CardHeader
                title={<SectionHeading label={headingLabel}>{title}</SectionHeading>}
                action={
                    secondaryActions && secondaryActions.length ? (
                        <SectionActionsMenu>{secondaryActions}</SectionActionsMenu>
                    ) : null
                }
            />
            <CardContent>{props.children}</CardContent>
        </Card>
    );
};

export default SectionCard;
