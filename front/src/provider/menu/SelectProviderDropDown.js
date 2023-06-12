import {EntityMenuDropDown} from "base/entity/components/presentational";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SelectProviderDropDown = ({provider}) => {
    const getDropdownItemContent = eachProvider => {
        return (
            <Stack>
                <Typography variant="caption" sx={{ml: 1}}>
                    {eachProvider.name}
                </Typography>
            </Stack>
        );
    };

    return (
        <EntityMenuDropDown
            currentItem={provider}
            urlPrimarySlug="providers"
            entityPrimaryInfo={provider?.name}
            headingSecondaryText="Prestador:"
            getDropdownItemContent={getDropdownItemContent}
        />
    );
};

export default SelectProviderDropDown;