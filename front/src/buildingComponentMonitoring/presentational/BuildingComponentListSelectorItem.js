import {getStatusIcon} from "./BuildingComponentStatusChip";
import {TextLink} from "base/navigation/components";

import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";

const BuildingComponentListSelectorItem = ({
    buildingComponent,
    to,
    selected = false,
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
                {getStatusIcon(buildingComponent.execution_status, !selected)}
                <TextLink
                    text={buildingComponent.name}
                    to={to}
                    textStyle={{
                        fontWeight: selected ? "bold" : "inherit",
                        pl: 1,
                    }}
                />
            </Stack>
        </ListItem>
    );
};

export default BuildingComponentListSelectorItem;
