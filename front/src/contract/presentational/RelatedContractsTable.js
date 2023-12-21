import {useContractTable} from "contract/data";
import {EntityTable} from "base/entity/components/presentational";

const RelatedContractsTable = ({contracts}) => {
    const {tableColumns} = useContractTable();

    return (
        <EntityTable
            columns={tableColumns}
            service={() => Promise.resolve({results: contracts})}
        />
    );
};

export default RelatedContractsTable;
