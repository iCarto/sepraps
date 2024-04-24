import {FinancingProgramService} from "financingprogram/service";
import {EntityMenuDropDown} from "base/entity/components/presentational";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SelectFinancingProgramDropDown = ({financingProgram}) => {
    const renderDropdownItem = eachFinancingProgram => {
        return (
            <Stack>
                <Typography>{eachFinancingProgram.short_name}</Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    {eachFinancingProgram.name}
                </Typography>
            </Stack>
        );
    };

    return (
        <EntityMenuDropDown
            title="Programa"
            primary={financingProgram?.short_name}
            secondary={financingProgram?.name}
            basePath={"/financingprograms/list"}
            service={FinancingProgramService.getList}
            renderDropdownItem={renderDropdownItem}
        />
    );
};

export default SelectFinancingProgramDropDown;
