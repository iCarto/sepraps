import {ProviderService} from "provider/service";
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

    const entityInfo = provider
        ? {
              id: provider?.id,
              title: "Prestador:",
              slug: "providers",
              primaryInfo: provider?.name,
              secondaryInfo: "",
              tag: null,
          }
        : null;

    return (
        <EntityMenuDropDown
            entityInfo={entityInfo}
            service={ProviderService.getList}
            getDropdownItemContent={getDropdownItemContent}
        />
    );
};

export default SelectProviderDropDown;
