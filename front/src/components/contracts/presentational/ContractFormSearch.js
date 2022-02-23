import {useState} from "react";

import {ContractSearchAutocomplete} from ".";
import {ProjectContractSection} from "components/project/presentational/financing";

import Grid from "@mui/material/Grid";

const ContractFormSearch = ({onSelect}) => {
    const [existingContract, setExistingContract] = useState(null);

    const handleSelectExistingContract = contract => {
        setExistingContract(contract);
        onSelect(contract);
    };

    return (
        <Grid container spacing={2} sx={{mt: 0.25}}>
            <Grid item xs={12}>
                <ContractSearchAutocomplete
                    handleSelect={handleSelectExistingContract}
                />
            </Grid>
            <Grid item xs={12}>
                {existingContract && (
                    <ProjectContractSection
                        contract={existingContract}
                        hideLinkToContract={true}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default ContractFormSearch;
