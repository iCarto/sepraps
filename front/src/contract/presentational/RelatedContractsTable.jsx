import {useContractTable} from "contract/data";
import {UnpaginatedTable} from "base/table/components";

const RelatedContractsTable = ({contracts}) => {
    const {tableColumns} = useContractTable("short");

    return (
        <UnpaginatedTable
            columns={tableColumns}
            service={() => Promise.resolve({results: contracts})}
            sortable={false}
        />
    );
};

export default RelatedContractsTable;
