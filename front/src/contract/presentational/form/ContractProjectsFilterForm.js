import {useCallback, useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

import {FinancingService} from "financingprogram/service";
import {ContractService, TEMPLATE} from "contract/service";

import {SearchBox} from "base/search/components";
import {FormAutocomplete} from "base/form/components";

import Grid from "@mui/material/Grid";

const ContractProjectsFilterForm = ({onFilterChange}) => {
    const [contracts, setContracts] = useState([]);
    const [financingPrograms, setFinancingPrograms] = useState([]);
    const [loadedDomains, setLoadedDomains] = useState(false);

    useEffect(() => {
        if (!loadedDomains) {
            Promise.all([
                ContractService.getList({template: TEMPLATE.SHORT, closed: false}),
                FinancingService.getFinancingPrograms(),
            ]).then(([contracts, financingPrograms]) => {
                setContracts(contracts);
                setFinancingPrograms(financingPrograms);
                setLoadedDomains(true);
            });
        }
    }, [loadedDomains]);

    const formMethods = useForm({
        defaultValues: {
            searchText: "",
            financing_program: "",
            construction_contract: "",
        },
    });

    const handleChange = useCallback(attributeValue => {
        onFilterChange(attributeValue);
    }, []);

    return (
        <FormProvider {...formMethods}>
            <Grid container columnSpacing={1}>
                <Grid item xs={12}>
                    <SearchBox
                        name="searchText"
                        onChangeHandler={value => handleChange({search: value})}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormAutocomplete
                        name="construction_contract"
                        label="Contrato"
                        options={contracts}
                        optionLabelAttribute="number"
                        onChangeHandler={option =>
                            handleChange({
                                construction_contract: option ? option.id : null,
                            })
                        }
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormAutocomplete
                        name="financing_program"
                        label="Programa de financiación"
                        options={financingPrograms}
                        optionLabelAttribute="short_name"
                        onChangeHandler={option =>
                            handleChange({
                                financing_program: option ? option.id : null,
                            })
                        }
                    />
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default ContractProjectsFilterForm;
