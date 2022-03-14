import {SectionHeading} from ".";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import SectionActionsMenu from "./SectionActionsMenu";

const SectionCard = ({
    isSidePanelOpen = null,
    title = "",
    secondaryActions = null,
    ...props
}) => {
    const cardStyle = {
        overflow: "auto",
        width: "calc(100% - 230px)",
    };

    return (
        <Card sx={isSidePanelOpen === true && cardStyle} variant="outlined">
            <CardHeader
                title={<SectionHeading>{title}</SectionHeading>}
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
