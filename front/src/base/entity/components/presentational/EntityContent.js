import {cloneElement} from "react";
import {SectionActionsMenu} from "base/ui/section/components";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const EntityContent = ({
    children,
    entityLabel,
    entityName,
    entityIcon,
    chip = null,
    actions = null,
    headerMode = "view",
    EditForm = null,
}) => {
    const getComponent = mode => {
        if (mode === "view") {
            return (
                <Typography
                    color="primary.main"
                    sx={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                    }}
                    variant="h5"
                >
                    {entityName}
                </Typography>
            );
        } else {
            return EditForm;
        }
    };

    return (
        <Card
            sx={{border: 1, borderColor: "grey.300"}}
            elevation={3}
            component="section"
        >
            <CardHeader
                action={<SectionActionsMenu>{actions}</SectionActionsMenu>}
                title={
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={1}
                        sx={{mr: 1}}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{width: "100%"}}
                        >
                            {cloneElement(entityIcon, {
                                sx: {color: "grey.400"},
                            })}
                            <Typography color="grey">{entityLabel}:</Typography>
                            {getComponent(headerMode)}
                        </Stack>
                        <Box>{chip}</Box>
                    </Stack>
                }
                sx={{bgcolor: "white", borderBottom: "1px solid #ccc"}}
            />
            <CardContent sx={{bgcolor: "grey.100"}}>
                <Stack spacing={1}>{children}</Stack>
            </CardContent>
        </Card>
    );
};

export default EntityContent;
