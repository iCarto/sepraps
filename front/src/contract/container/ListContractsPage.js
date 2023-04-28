import {ContractService} from "contract/service";
import {EntityListPage} from "base/entity/pages";
import {ContractFilterForm} from "contract/presentational/form";
import {useContractTable} from "contract/data/ContractsTableColumns";

const ListContractsPage = () => {
    const {tableColumns} = useContractTable();

    return (
        <EntityListPage
            views={["list", "table"]}
            entityName="contratos"
            service={ContractService.getAll}
            basePath="contracts"
            tableColumns={tableColumns}
            filterForm={<ContractFilterForm />}
        />
    );
};
export default ListContractsPage;
