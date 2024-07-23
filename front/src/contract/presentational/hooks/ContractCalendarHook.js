import {useEffect, useState} from "react";

function useContractCalendar(contract, items) {
    const [contractYears, setContractYears] = useState([]);
    const [contractItemsWithDate, setContractItemsWithDate] = useState([]);

    useEffect(() => {
        if (contract && items) {
            let contractStartDate = contract.execution_start_date;
            let contractEndDate =
                contract.amended_expected_execution_end_date ||
                contract.expected_execution_end_date;
            if (contractStartDate && contractEndDate) {
                let calendarStartDate = new Date(contractStartDate);
                let calendarEndDate = new Date(contractEndDate);

                const updatedItems = getItemsWithDate(items);

                if (updatedItems?.length > 0) {
                    const earliestItemDate = getEarliestItemDate(updatedItems);
                    const latestItemDate = getLatestItemDate(updatedItems);

                    if (earliestItemDate && earliestItemDate < calendarStartDate) {
                        calendarStartDate = earliestItemDate;
                    }
                    if (latestItemDate && latestItemDate > calendarEndDate) {
                        calendarEndDate = latestItemDate;
                    }
                }

                const years = Array(
                    calendarEndDate.getFullYear() - calendarStartDate.getFullYear() + 1
                )
                    .fill()
                    .map((_, idx) => calendarStartDate.getFullYear() + idx);

                setContractYears(years);
                setContractItemsWithDate(updatedItems);
            }
        }
    }, [contract, items]);

    const getItemsWithDate = items => {
        return items.map(item => {
            let itemDate;
            if (Object.keys(item).includes("payment")) {
                itemDate =
                    item.payment.approval_date || item.payment.expected_approval_date;
            } else {
                itemDate = item.approval_date || item.expected_approval_date;
            }
            return {
                ...item,
                itemDate: itemDate ? new Date(itemDate) : null,
            };
        });
    };

    const getLatestItemDate = items => {
        return items.reduce((latest, current) => {
            if (!latest) return current.itemDate;
            if (current.itemDate && current.itemDate > latest) return current.itemDate;
            else return latest;
        }, null);
    };

    const getEarliestItemDate = items => {
        return items.reduce((earliest, current) => {
            if (!earliest) return current.itemDate;
            if (current.itemDate && current.itemDate < earliest) {
                return current.itemDate;
            } else return earliest;
        }, null);
    };

    return {contractYears, contractItemsWithDate};
}

export {useContractCalendar};
