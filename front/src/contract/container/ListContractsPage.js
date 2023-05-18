import {ContractService} from "contract/service";
import {useContractTable} from "contract/data/ContractsTableColumns";
import {EntityListPage} from "base/entity/components/container";
import {ContractFilterForm} from "contract/presentational/form";
import {ContractCard} from "contract/presentational";

const ListContractsPage = () => {
    const {tableColumns} = useContractTable();

    return (
        <EntityListPage
            service={ContractService}
            views={["list", "table"]}
            entityName="contratos"
            basePath="contracts"
            tableColumns={tableColumns}
            filterForm={<ContractFilterForm />}
            card={ContractCard}
        />
    );
};
export default ListContractsPage;
