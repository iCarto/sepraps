import {useAdministrativeDivisions} from "../provider";
import FormSelectMultipleChip from "./FormSelectMultipleChip";

const FormLocationFilter = ({onFilter}) => {
    const {departments} = useAdministrativeDivisions();

    const handleFilter = departments => {
        onFilter(departments);
    };

    return (
        <FormSelectMultipleChip
            name="department"
            label="Departamento"
            options={departments}
            onFilter={handleFilter}
        />
    );
};

export default FormLocationFilter;
