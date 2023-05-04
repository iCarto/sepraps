import {ContractService} from "contract/service";
import {useContractTable} from "contract/data/ContractsTableColumns";
import {EntityListPage} from "base/entity/pages";
import {ContractFilterForm} from "contract/presentational/form";

const ListContractsPage = () => {
    const {tableColumns} = useContractTable();

    return (
        <EntityListPage
            service={ContractService.getAll}
            views={["list", "table"]}
            entityName="contratos"
            basePath="contracts"
            tableColumns={tableColumns}
            filterForm={<ContractFilterForm />}
        />
    );
};
export default ListContractsPage;
