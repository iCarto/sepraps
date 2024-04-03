import {ContractService} from "contract/service";
import {useContractTable} from "contract/data/ContractsTableColumns";
import {EntityListPage} from "base/entity/components/container";
import {ContractFilterForm} from "contract/presentational/form";
import {ContractCard} from "contract/presentational";

const ListContractsPage = () => {
    const {tableColumns} = useContractTable();

    return (
        <EntityListPage
            views={["table", "list"]}
            entityName="Contratos"
            service={ContractService}
            tableColumns={tableColumns}
            filterForm={<ContractFilterForm />}
            basePath="contracts"
            card={ContractCard}
            downloadOptions={["csv"]}
        />
    );
};
export default ListContractsPage;
