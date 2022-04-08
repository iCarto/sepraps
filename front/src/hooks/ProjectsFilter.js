import {useState} from "react";

/**The filterProjectFunction receives an object of properties (project), which includes the property keys in the object filter. It filters out the properties "showClosedProjects" and "searchText"(not present in the project object) and then returns only those objects that match all key values.
 The searchFunction receives an array made of specific properties from the project object, and returns true when the searchText property is empty or when it is contained in the assessed project. */

function useProjectsFilter(filters) {
    const [filter, setFilter] = useState(filters);

    function filterProjectsFunction(project) {
        const propertiesForSearchFilter = [
            project.name,
            project.department_name,
            project.district_name,
            project.locality_name,
            project.construction_contract_number,
            project.construction_contract_bid_request_number,
            project.financing_program_name,
            project.financing_fund_name,
        ];

        const searchFunction = item => {
            if (!item || !filter?.searchText || filter?.searchText.length < 2) {
                return true;
            } else {
                return item
                    .toString()
                    .toUpperCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .includes(
                        filter.searchText
                            .toUpperCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                    );
            }
        };

        return (
            Object.keys(filter)
                .filter(
                    key =>
                        key !== "showClosedProjects" &&
                        key !== "searchText" &&
                        filter[key]
                )
                .every(key => filter[key] === project[key]) &&
            searchFunction(propertiesForSearchFilter)
        );
    }

    return {filter, setFilter, filterProjectsFunction};
}

export {useProjectsFilter};
