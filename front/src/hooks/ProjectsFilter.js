import {useState} from "react";

/**Using the filterFunction, it filteres for a given string (filter) in an array of items by specific properties; if filter is an empty string, it does not filter the array.*/
function useProjectsFilter(filters) {
    const [filterItems, setFilterItems] = useState(filters);

    function filterProjectsFunction(item) {
        return Object.keys(filterItems)
            .filter(key => filterItems[key])
            .every(key => filterItems[key] === item[key]);
    }

    return {filterItems, setFilterItems, filterProjectsFunction};
}

export {useProjectsFilter};
