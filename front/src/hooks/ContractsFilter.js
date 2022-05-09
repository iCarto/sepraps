import {useState} from "react";

/**filterContractFunction receives an object of properties (contract), which includes the same property keys as in the object filter. It filters out the properties "status", "searchText" and "switchStatus" (not present in the contract object) and then returns only those objects that match all key values.
 The searchFunction receives an array made of specific properties from the contract object, and returns true when the searchText property is empty or when it is contained in the assessed contract. */

function useContractsFilter(filters) {
    const [filter, setFilter] = useState(filters);

    function filterContractsFunction(contract) {
        const propertiesForSearchFilter = [
            contract.number,
            contract.comments,
            contract.bid_request_number,
            contract.contractor?.name,
            contract.financing_program?.name,
            contract.financing_program?.short_name,
        ];

        const searchFunction = (item, searchText) => {
            if (!item) {
                return false;
            }
            return item
                .toString()
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(
                    searchText
                        .toUpperCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                );
        };

        let filtered = true;

        if (filter.searchText) {
            filtered =
                filtered &&
                propertiesForSearchFilter.some(item =>
                    searchFunction(item, filter.searchText)
                );
        }

        if (filter.financing_fund) {
            filtered =
                filtered &&
                contract.financing_program &&
                contract.financing_program.financing_funds.some(
                    financing_fund => financing_fund.id === filter.financing_fund
                );
        }

        if (filter.financing_program) {
            filtered =
                filtered &&
                contract.financing_program &&
                contract.financing_program.id === filter.financing_program;
        }

        if (filter.contractor) {
            filtered =
                filtered &&
                contract.contractor &&
                contract.contractor.id === filter.contractor;
        }

        if (filter.awarding_date_min) {
            filtered =
                filtered &&
                contract.awarding_date &&
                contract.awarding_date.getTime() >= filter.awarding_date_min.getTime();
        }

        if (filter.awarding_date_max) {
            filtered =
                filtered &&
                contract.awarding_date &&
                contract.awarding_date.getTime() <= filter.awarding_date_max.getTime();
        }

        return filtered;
    }

    return {filter, setFilter, filterContractsFunction};
}

export {useContractsFilter};
