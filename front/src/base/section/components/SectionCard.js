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
        width: "100%",
    };

    const cardStyleForSidePanel = {
        overflow: "auto",
        width: {xs: 0, sm: "20%", md: "40%", lg: "68%", xl: "100%"},
    };

    return (
        <Card
            sx={isSidePanelOpen ? cardStyleForSidePanel : cardStyle}
            variant="outlined"
        >
            {secondaryActions || title !== "" ? (
                <CardHeader
                    title={
                        <SectionHeading label={headingLabel}>{title}</SectionHeading>
                    }
                    action={
                        secondaryActions && secondaryActions.length ? (
                            <SectionActionsMenu>{secondaryActions}</SectionActionsMenu>
                        ) : null
                    }
                />
            ) : null}
            <CardContent sx={props.contentStyle}>{props.children}</CardContent>
        </Card>
    );
};

export default SectionCard;
