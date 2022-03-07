import {SectionHeading} from ".";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import SectionActionsMenu from "./SectionActionsMenu";

const SectionCard = ({title = "", secondaryActions = null, ...props}) => {
    return (
        <Card
            sx={{
                overflow: "auto",
                width: "100%",
            }}
            variant="outlined"
        >
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
