import {useState} from "react";

/**Using the filterFunction, it filters for a given string (filter) in an array of items by specific properties; if filter is an empty string, it does not filter the array.*/
function useFilter(filters) {
    const [filter, setFilter] = useState(filters);

    function filterFunction(item) {
        // TO-DO: Fix bootstrapped code
        const propertiesToCheck = [item.name, item.role, item.email];

        return (
            filter.length === 0 ||
            filter.every(element => propertiesToCheck.indexOf(element.value) > -1)
        );
    }

    return {filter, setFilter, filterFunction};
}

export {useFilter};
