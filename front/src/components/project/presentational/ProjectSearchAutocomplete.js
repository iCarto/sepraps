import {ProjectService} from "service/api";
import {SearchAutocomplete} from "components/common/presentational";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProjectSearchAutocomplete = ({handleSelect}) => {
    const optionComponent = option => {
        return (
            <Stack>
                <Typography>
                    {option.name} - {option.code}
                </Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    {option.location}
                </Typography>
            </Stack>
        );
    };

    return (
        <SearchAutocomplete
            label="Buscar un proyecto"
            optionLabel="name"
            optionComponent={optionComponent}
            search={ProjectService.getProjectsBySearchText}
            handleSelect={handleSelect}
        />
    );
};

export default ProjectSearchAutocomplete;
