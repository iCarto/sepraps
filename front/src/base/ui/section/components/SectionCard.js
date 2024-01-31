import {SectionActionsMenu, SectionHeading} from "base/ui/section/components";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

const SectionCard = ({
    isSidePanelOpen = null,
    headingLabel = true,
    title = "",
    secondaryAction = null,
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

    const getActions = () => {
        if (secondaryAction) return secondaryAction;
        if (secondaryActions)
            return <SectionActionsMenu>{secondaryActions}</SectionActionsMenu>;
        else return null;
    };

    return (
        <Card
            sx={isSidePanelOpen ? cardStyleForSidePanel : cardStyle}
            component="section"
        >
            {secondaryAction || secondaryActions || title ? (
                <CardHeader
                    title={
                        <SectionHeading label={headingLabel}>{title}</SectionHeading>
                    }
                    action={getActions()}
                    sx={{pb: 1}}
                />
            ) : null}
            <CardContent sx={props.contentStyle}>{props.children}</CardContent>
        </Card>
    );
};

export default SectionCard;
