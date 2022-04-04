import {useState} from "react";

/**Using the filterFunction, it filteres for a given string (filterItems) in an array of items by specific properties; if filterItems is an empty string, it does not filter the array.*/
function useFilter(filters) {
    const [filterItems, setFilterItems] = useState(filters);

    function filterFunction(item) {
        const propertiesToCheck = [item.name, item.role, item.email];

        return (
            filterItems.length === 0 ||
            filterItems.every(element => propertiesToCheck.indexOf(element.value) > -1)
        );
    }

    return {filterItems, setFilterItems, filterFunction};
}

export {useFilter};
