import {ProviderService} from "provider/service";
import {EntityMenuDropDown} from "base/entity/components/presentational";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SelectProviderDropDown = ({provider}) => {
    const renderDropdownItem = eachProvider => {
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
            title="Prestador"
            primary={provider?.name}
            basePath={"/providers/list"}
            service={ProviderService.getList}
            renderDropdownItem={renderDropdownItem}
        />
    );
};

export default SelectProviderDropDown;
