import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import {ContractService} from "service/api";
import {FormSelectMultipleChip} from ".";

const FormContractFilter = ({onFilter}) => {
    const [contractNumbers, setContractNumbers] = useState();

    let context;
    [context] = useOutletContext();

    const {filterItems} = context;

    const activeContractFilter = filterItems.find(item => item.key === "contract");

    let activeContractFilterValue = activeContractFilter
        ? [activeContractFilter.value]
        : [];

    useEffect(() => {
        ContractService.getContracts().then(data => {
            setContractNumbers(
                data.map((contract, index) => ({value: index, label: contract.number}))
            );
        });
    }, []);

    const handleFilter = (contractNumbers, filterName) => {
        onFilter(contractNumbers, filterName);
    };

    return (
        <Grid item xs={12}>
            <FormSelectMultipleChip
                name="contract"
                label="Contrato"
                options={contractNumbers}
                onFilter={handleFilter}
                activeFilter={activeContractFilterValue}
            />
        </Grid>
    );
};

export default FormContractFilter;
