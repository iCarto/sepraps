import {ProjectService} from "service/api";
import {SearchAutocomplete} from "components/common/presentational";

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
            search={ProjectService.getProjectsBySearchText}
            handleSelect={handleSelect}
        />
    );
};

export default ProjectSearchAutocomplete;
