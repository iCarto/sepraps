import {useState} from "react";

/**filterContractFunction receives an object of properties (contract), which includes the same property keys as in the object filter. It filters out the properties "status", "searchText" and "switchStatus" (not present in the contract object) and then returns only those objects that match all key values.
 The searchFunction receives an array made of specific properties from the contract object, and returns true when the searchText property is empty or when it is contained in the assessed contract. */

function useContractsFilter(filters) {
    const [filter, setFilter] = useState(filters);

    function filterContractsFunction(contract) {
        const propertiesForSearchFilter = [contract.number];

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

        return filtered;
    }

    return {filter, setFilter, filterContractsFunction};
}

export {useContractsFilter};
