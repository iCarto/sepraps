import {useState} from "react";

/**filterProjectFunction receives an object of properties (project), which includes the same property keys as in the object filter. It filters out the properties "status", "searchText" and "switchStatus" (not present in the project object) and then returns only those objects that match all key values.
 The searchFunction receives an array made of specific properties from the project object, and returns true when the searchText property is empty or when it is contained in the assessed project. */

function useProjectsFilter(filters) {
    const [filter, setFilter] = useState(filters);

    function filterProjectsFunction(project) {
        const propertiesForSearchFilter = [
            project.name,
            project.location,
            project.description,
            project.construction_contract_number,
            project.construction_contract_bid_request_number,
            project.financing_program_name,
            project.financing_fund_name,
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

        if (filter.construction_contract) {
            filtered =
                filtered &&
                project.construction_contract === filter.construction_contract;
        }

        if (filter.department) {
            filtered =
                filtered &&
                project.linked_localities.some(
                    locality => locality.department === filter.department
                );
        }

        if (filter.district) {
            filtered =
                filtered &&
                project.linked_localities.some(
                    locality => locality.district === filter.district
                );
        }

        /*return (
            Object.keys(filter)
                .filter(
                    key =>
                        key !== "status" &&
                        key !== "switchStatus" &&
                        key !== "searchText" &&
                        filter[key]
                )
                .every(key => filter[key] === project[key]) &&
            searchFunction(propertiesForSearchFilter)
        );*/

        return filtered;
    }

    return {filter, setFilter, filterProjectsFunction};
}

export {useProjectsFilter};
