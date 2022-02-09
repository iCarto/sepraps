import {SectionTitle} from ".";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

const SectionCard = ({title = "", headerActions = [], ...props}) => {
    return (
        <Card
            sx={{
                overflow: "auto",
            }}
        >
            <CardHeader
                title={<SectionTitle>{title}</SectionTitle>}
                action={
                    <CardActions disableSpacing sx={{pt: 0, pb: 0}}>
                        {headerActions}
                    </CardActions>
                }
            />
            <CardContent>{props.children}</CardContent>
        </Card>
    );
};

export default SectionCard;
