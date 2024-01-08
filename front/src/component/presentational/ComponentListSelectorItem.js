import {getStatusIcon} from "component/presentational/ComponentStatusChip";
import {TextLink} from "base/navigation/components";

import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";

const ComponentListSelectorItem = ({
    component,
    to,
    selected = false,
    reduceItemsFontSize = false,
}) => {
    return (
        <ListItem
            disablePadding
            sx={{
                mt: 1,
                p: 1,
                borderRadius: 1,
                backgroundColor: selected ? "secondary.lighter" : "inherit",
            }}
        >
            <Stack direction="row">
                {getStatusIcon(component.execution_status, !selected)}
                <TextLink
                    text={component.name}
                    to={to}
                    textStyle={{
                        fontWeight: selected ? "bold" : "inherit",
                        fontSize: reduceItemsFontSize ? "14px" : "inherit",
                        pl: 1,
                    }}
                />
            </Stack>
        </ListItem>
    );
};

export default ComponentListSelectorItem;
