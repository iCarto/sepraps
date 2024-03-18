import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {ContractService} from "contract/service";
import {contract_view_adapter} from "contract/model";

import {EntityCreatePage} from "base/entity/components/container";
import {FormSection} from "base/form/components";
import {
    ContractBidRequestFormFields,
    ContractFinancingFormFields,
    ContractForm,
    ContractGeneralDataFormFields,
} from "contract/presentational/form";
import Grid from "@mui/material/Grid";

const CreateContractPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.split("/new")[0];

    const [error, setError] = useState("");

    const handleFormSubmit = contract => {
        ContractService.create(contract_view_adapter({...contract}))
            .then(createdContract => {
                navigate(`/contracts/list/${createdContract.id}/summary`);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(`${basePath}/list`);
    };

    return (
        <EntityCreatePage
            title="Registro de contrato"
            form={
                <ContractForm onSubmit={handleFormSubmit} onCancel={handleFormCancel}>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormSection title="Información general">
                                <ContractGeneralDataFormFields />
                            </FormSection>
                        </Grid>
                        <Grid item xs={12}>
                            <FormSection title="Financiación">
                                <ContractFinancingFormFields />
                            </FormSection>
                        </Grid>
                        <Grid item xs={12}>
                            <FormSection title="Licitación">
                                <ContractBidRequestFormFields />
                            </FormSection>
                        </Grid>
                    </Grid>
                </ContractForm>
            }
            error={error}
        />
    );
};

export default CreateContractPage;
