import {useState} from "react";
import {Outlet} from "react-router-dom";
import {useContractsFilter} from "hooks";

import {ContractListViewProvider} from "../provider";

/**
 * High Order Component that stores filter and contract list
 * @returns
 */
const ManageContractsPage = () => {
    const [filteredContracts, setFilteredContracts] = useState([]);
    const {filter, setFilter, filterContractsFunction} = useContractsFilter({});

    return (
        <ContractListViewProvider>
            <Outlet
                context={[
                    {
                        filter,
                        setFilter,
                        filterContractsFunction,
                        filteredContracts,
                        setFilteredContracts,
                    },
                ]}
            />
        </ContractListViewProvider>
    );
};

export default ManageContractsPage;
