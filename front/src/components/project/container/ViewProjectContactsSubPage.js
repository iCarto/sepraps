import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useSearch} from "hooks";
import {ProjectService} from "service/api";

import {SubPageLayout} from "layout";
import {ContactsTable} from "components/contacts/presentational";
import {SearchBox, SectionCard} from "components/common/presentational";

import Grid from "@mui/material/Grid";

const ViewProjectContactsSubPage = () => {
    let project;
    [project] = useOutletContext();

    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const {searchText, setSearchText, searchFunction} = useSearch("");

    useEffect(() => {
        ProjectService.getProjectContacts(project.id).then(data => {
            setContacts(data);
        });
    }, []);

    useEffect(() => {
        setFilteredContacts([...contacts].filter(searchFunction));
    }, [contacts, searchText]);

    const handleSearch = data => {
        setSearchText(data);
    };

    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    return (
        <SubPageLayout getIsSidePanelOpen={getIsSidePanelOpen}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SectionCard
                        title="Contactos del proyecto"
                        isSidePanelOpen={isSidePanelOpen}
                    >
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
        </SubPageLayout>
    );
};

export default ViewProjectContactsSubPage;
