import {COMPONENT_EXECUTION_STATUS_IN_PROGRESS} from "component/config";
import {NumberUtil} from "base/format/utilities";

import {SectionActionsMenu} from "base/ui/section/components";
import {ComponentStatusChip} from "component/presentational";

import Stack from "@mui/material/Stack";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

const SocialComponentCardHeader = ({componentName = "", component, actions = null}) => {
    const componentStatusLabel =
        component?.execution_status === COMPONENT_EXECUTION_STATUS_IN_PROGRESS
            ? `${component?.execution_status_label} — ${NumberUtil.formatDecimal(
                  component?.progress_percentage
              )}%`
            : component?.execution_status_label || "Estado sin especificar";

    return (
        <CardHeader
            action={<SectionActionsMenu>{actions}</SectionActionsMenu>}
            title={
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={1}
                    mr={1}
                >
                    <Typography
                        color="primary.main"
                        sx={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                        }}
                        variant="h6"
                    >
                        {componentName}
                    </Typography>
                    <ComponentStatusChip
                        label={componentStatusLabel}
                        value={component?.execution_status}
                    />
                </Stack>
            }
            sx={{bgcolor: "grey.50", borderBottom: "1px solid #ccc"}}
        />
    );
};

export default SocialComponentCardHeader;
