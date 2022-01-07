import {useSearch} from "hooks";

import {SectionCard, SearchBox} from "components/common/presentational";
import {ContactsTable} from ".";
import Grid from "@mui/material/Grid";

const ProjectContactsSection = () => {
    const {searchText, setSearchText, searchFunction} = useSearch("");

    const handleSearch = data => {
        setSearchText(data);
    };

    return (
        <SectionCard title="Contactos del proyecto">
            <Grid container sx={{mb: 2}}>
                <Grid item xs={12} md={4}>
                    <SearchBox searchValue={searchText} handleSearch={handleSearch} />
                </Grid>
            </Grid>
            <ContactsTable searchFunction={searchFunction} />
        </SectionCard>
    );
};

export default ProjectContactsSection;
