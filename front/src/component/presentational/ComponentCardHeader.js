import {cloneElement} from "react";

import {SectionActionsMenu} from "base/ui/section/components";
import {ComponentStatusChip} from "component/presentational";

import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";

const ComponentCardHeader = ({componentName = "", component, actions = null, icon}) => {
    return (
        <CardHeader
            action={<SectionActionsMenu>{actions}</SectionActionsMenu>}
            title={
                <Stack direction="row" alignItems="center" spacing={1}>
                    {cloneElement(icon, {
                        sx: {color: "grey"},
                    })}
                    <Typography color="grey">Componente:</Typography>
                    <Typography
                        color="primary.main"
                        sx={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            maxWidth: "70%",
                        }}
                        variant="h5"
                    >
                        {componentName}
                    </Typography>
                    <ComponentStatusChip
                        label={
                            component?.execution_status_label ||
                            "Estado sin especificar"
                        }
                        value={component?.execution_status}
                    />
                </Stack>
            }
            sx={{bgcolor: "grey.50", borderBottom: "1px solid #ccc"}}
        />
    );
};

export default ComponentCardHeader;
