import {cloneElement} from "react";

import {COMPONENT_EXECUTION_STATUS_IN_PROGRESS} from "component/config";
import {NumberUtil} from "base/format/utilities";

import {SectionActionsMenu} from "base/ui/section/components";
import {ComponentStatusChip} from "component/presentational";

import Stack from "@mui/material/Stack";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

const ComponentCardHeader = ({
    componentName = "",
    component,
    actions = null,
    icon,
    label = "",
}) => {
    const componentStatusLabel =
        component?.execution_status === COMPONENT_EXECUTION_STATUS_IN_PROGRESS
            ? `${component?.execution_status_label} — ${NumberUtil.formatDecimal(
                  component?.physical_progress_percentage ||
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
                    spacing={2}
                    mr={1}
                >
                    <Stack direction="row" alignItems="center" spacing={2}>
                        {cloneElement(icon, {
                            sx: {color: "grey"},
                        })}
                        {label ? <Typography color="grey">{label}:</Typography> : null}
                        <Typography
                            color="primary.main"
                            sx={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                lineHeight: 1.2,
                            }}
                            variant="h5"
                        >
                            {componentName}
                        </Typography>
                    </Stack>
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

export default ComponentCardHeader;
