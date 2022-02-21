import {useState} from "react";

import {ContractorSearchAutocomplete, ContractorSection} from ".";

import Grid from "@mui/material/Grid";

const ContractorFormSearch = ({handleSelect}) => {
    const [existingContractor, setExistingContractor] = useState(null);

    const handleSelectExistingContractor = contractor => {
        setExistingContractor(contractor);
        if (contractor) {
            handleSelect(contractor);
        }
    };

    return (
        <Grid container spacing={2} sx={{mt: 0.25}}>
            <Grid item xs={12}>
                <ContractorSearchAutocomplete
                    handleSelect={handleSelectExistingContractor}
                />
            </Grid>
            <Grid item xs={12}>
                {existingContractor && (
                    <ContractorSection
                        contractor={existingContractor}
                        showOnlySummary={true}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default ContractorFormSearch;
