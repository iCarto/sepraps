import {FinancingProgramService} from "financingprogram/service";
import {useFinancingProgramTableColumns} from "financingprogram/data";
import {EntityListPage} from "base/entity/components/container";
import {FinancingProgramFilterForm} from "financingprogram/presentational/form";

const ListFinancingProgramsPage = () => {
    const {tableColumns} = useFinancingProgramTableColumns();

    return (
        <>
            <EntityListPage
                views={["table"]}
                entityName="Programas de financiación"
                service={FinancingProgramService}
                tableColumns={tableColumns}
                filterForm={<FinancingProgramFilterForm />}
                basePath="financingprograms"
                createButton={false}
                downloadOptions={["csv"]}
            />
        </>
    );
};
export default ListFinancingProgramsPage;
