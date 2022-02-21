import {useState} from "react";

import {ContractSearchAutocomplete} from ".";
import {ProjectContractSection} from "components/project/presentational/financing";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ContractFormSearch = ({onSelect, onCancel}) => {
    const [existingContract, setExistingContract] = useState(null);

    const handleSelectExistingContract = contract => {
        setExistingContract(contract);
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
                    <ProjectContractSection contract={existingContract} />
                )}
            </Grid>
            <Grid container justifyContent="center" sx={{mt: 2}}>
                <Grid>
                    <Button color="inherit" onClick={onCancel}>
                        Cerrar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ml: 2}}
                        onClick={() => {
                            onSelect(existingContract);
                        }}
                    >
                        Añadir
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ContractFormSearch;
