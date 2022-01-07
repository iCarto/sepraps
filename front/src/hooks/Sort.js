import {useState} from "react";

/**Using the method sortFunction, it sorts an array by attribute in descending or ascending order depending on the order "asc"/"desc" received */
function useSort(initialAttributeValue, initialOrderValue) {
    const [attribute, setAttribute] = useState(initialAttributeValue);
    const [order, setOrder] = useState(initialOrderValue);

    function sortFunction(a, b) {
        if (order === "desc") {
            if (a[attribute] > b[attribute]) {
                return -1;
            }
            if (b[attribute] < a[attribute]) {
                return 1;
            }
        } else if (order === "asc") {
            if (a[attribute] < b[attribute]) {
                return -1;
            }
            if (b[attribute] > a[attribute]) {
                return 1;
            }
        }
        return 0;
    }

    return {attribute, setAttribute, order, setOrder, sortFunction};
}

export {useSort};
