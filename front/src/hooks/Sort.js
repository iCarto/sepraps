import {useState} from "react";

function getDescendantProp(obj, desc) {
    var arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()]));
    return obj;
}

/**Using the method sortFunction, it sorts an array by attribute in descending or ascending order depending on the order "asc"/"desc" received */
function useSort(initialAttributeValue, initialOrderValue) {
    const [attribute, setAttribute] = useState(initialAttributeValue);
    const [order, setOrder] = useState(initialOrderValue);

    function sortFunction(a, b) {
        if (order === "desc") {
            if (getDescendantProp(a, attribute) > getDescendantProp(b, attribute)) {
                return -1;
            }
            if (getDescendantProp(b, attribute) < getDescendantProp(a, attribute)) {
                return 1;
            }
        } else if (order === "asc") {
            if (getDescendantProp(a, attribute) < getDescendantProp(b, attribute)) {
                return -1;
            }
            if (getDescendantProp(b, attribute) > getDescendantProp(a, attribute)) {
                return 1;
            }
        }
        return 0;
    }

    return {attribute, setAttribute, order, setOrder, sortFunction};
}

export {useSort};
