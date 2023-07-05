import {useEffect, useState} from "react";
import {ProjectService} from "project/service";
import {FormComboBox, FormTextArea} from "base/form/components";
import {ContractSearchAutocomplete} from "contract/presentational";

import Grid from "@mui/material/Grid";

const FieldReportProjectFormFields = ({section}) => {
    const [filter, setFilter] = useState({});
    const [projects, setProjects] = useState([]);

    const displayHistoryField = !section || section === "history";
    const displayAgreementsField = !section || section === "agreements";

    useEffect(() => {
        if (Object.keys(filter).length) {
            ProjectService.getAll(filter).then(data => {
                const projectList = data.map(project => ({
                    label: `${project.code} - ${project.location}`,
                    id: project.id,
                }));
                setProjects(projectList);
            });
        } else {
            setProjects([]);
        }
    }, [filter]);

    const handleSelectContract = contract => {
        if (contract) setFilter({construction_contract: contract.id});
        else setFilter({});
    };

    return (
        <Grid container columnSpacing={1}>
            {!section ? (
                <>
                    <Grid item xs={12} md={6}>
                        <ContractSearchAutocomplete
                            handleSelect={handleSelectContract}
                            rules={{required: "Este campo es obligatorio"}}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormComboBox
                            name="id"
                            options={projects}
                            label="Proyecto"
                            rules={{required: "Este campo es obligatorio"}}
                        />
                    </Grid>
                </>
            ) : null}
            {displayHistoryField ? (
                <Grid item xs={12}>
                    <FormTextArea name="history" label="Antecedentes" rows={8} />
                </Grid>
            ) : null}
            {displayAgreementsField ? (
                <Grid item xs={12}>
                    <FormTextArea
                        name="agreements"
                        label="Acuerdos alcanzados"
                        rows={8}
                    />
                </Grid>
            ) : null}
        </Grid>
    );
};

export default FieldReportProjectFormFields;
