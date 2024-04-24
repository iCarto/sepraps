import {cloneElement} from "react";
import {SectionActionsMenu} from "base/ui/section/components";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography/Typography";

const SubSectionCardHeader = ({
    titleLabel = "",
    titleValue = "",
    icon = null,
    actions = null,
    ...props
}) => {
    const titleIcon = cloneElement(icon, {
        sx: {color: "grey", fontSize: "18px"},
    });
    return (
        <CardHeader
            action={<SectionActionsMenu>{actions}</SectionActionsMenu>}
            title={
                <Stack direction="row" alignItems="center" spacing={1}>
                    {titleIcon}
                    <Typography color="grey">{titleLabel}:</Typography>
                    <Typography
                        color="primary.dark"
                        sx={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                        }}
                    >
                        {titleValue}
                    </Typography>
                </Stack>
            }
            sx={{bgcolor: "grey.50", borderBottom: 1, borderColor: "grey.200"}}
        />
    );
};

export default SubSectionCardHeader;
