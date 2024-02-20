import {ContractCalendarYear} from "./";

const ContractCalendar = ({years, items, itemsLabel, itemComponent}) => {
    const findItemsForYear = (items, year) => {
        return items.filter(item => {
            if (item.itemDate) {
                return item.itemDate.getFullYear() === year;
            }
            return false;
        });
    };

    return years.map(year => {
        return (
            <ContractCalendarYear
                key={year}
                year={year}
                items={findItemsForYear(items, year)}
                itemsLabel={itemsLabel}
                itemComponent={itemComponent}
            />
        );
    });
};

export default ContractCalendar;
