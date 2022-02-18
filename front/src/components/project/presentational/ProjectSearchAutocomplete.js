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
                    ({option.locality.locality_name} - {option.locality.district_name} -{" "}
                    {option.locality.department_name})
                </Typography>
            </Stack>
        );
    };

    return (
        <SearchAutocomplete
            label="Buscar un proyecto"
            optionLabel="name"
            optionComponent={optionComponent}
            search={ProjectService.getProjects}
            handleSelect={handleSelect}
        />
    );
};

export default ProjectSearchAutocomplete;
