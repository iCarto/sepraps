import {ProjectService} from "project/service";
import {SearchAutocomplete} from "base/search/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProjectSearchAutocomplete = ({handleSelect}) => {
    const optionComponent = option => {
        return (
            <Stack>
                <Typography>{option.name}</Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    {option.code} - {option.location}
                </Typography>
            </Stack>
        );
    };

    const getFilterOption = option => {
        return option.name + " - " + option.code;
    };

    return (
        <SearchAutocomplete
            label="Buscar un proyecto"
            optionLabel="name"
            optionComponent={optionComponent}
            getFilterOption={getFilterOption}
            search={ProjectService.getBySearchText}
            handleSelect={handleSelect}
        />
    );
};

export default ProjectSearchAutocomplete;
