import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useSearch} from "hooks";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {SearchBox, SectionCard} from "components/common/presentational";
import {ContactsTable} from "components/contacts/presentational";

const ViewProjectContactsSubPage = () => {
    let project;
    [project] = useOutletContext();

    const [filteredContacts, setFilteredContacts] = useState(project.contacts);
    const {searchText, setSearchText, searchFunction} = useSearch("");

    useEffect(() => {
        setFilteredContacts([...project.contacts].filter(searchFunction));
    }, [project.contacts, searchText]);

    const handleSearch = data => {
        setSearchText(data);
    };

    return (
        <Container maxWidth="lg" sx={{my: 3}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SectionCard title="Contactos del proyecto">
                        <Grid container sx={{mb: 2}}>
                            <Grid item xs={12} md={4}>
                                <SearchBox
                                    searchValue={searchText}
                                    handleSearch={handleSearch}
                                />
                            </Grid>
                        </Grid>
                        <ContactsTable contacts={filteredContacts} />
                    </SectionCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewProjectContactsSubPage;