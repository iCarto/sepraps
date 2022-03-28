import {useState} from "react";

/**Using the filterFunction, it filteres for a given string (filterItem) in an array of items by specific properties; if filterItem is an empty string, it does not filter the array.*/
function useFilter(filters) {
    const [filterItem, setFilterItem] = useState(filters);

    function filterFunction(item) {
        return (
            filterItem === "" ||
            [
                item.name,
                item.role,
                item.email,
                item.locality?.department_name,
                item.locality?.district_name,
                item.locality?.locality_name,
            ].includes(filterItem)
        );
    }

    return {filterItem, setFilterItem, filterFunction};
}

export {useFilter};
