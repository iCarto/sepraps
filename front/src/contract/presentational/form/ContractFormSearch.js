import {useState} from "react";

import Grid from "@mui/material/Grid";
import {ContractSearchAutocomplete, ContractSummary} from "..";

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
                {existingContract && <ContractSummary contract={existingContract} />}
            </Grid>
        </Grid>
    );
};

export default ContractFormSearch;
