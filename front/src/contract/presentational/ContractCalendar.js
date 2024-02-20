import {ContractCalendarYear} from "./";
import {ContainerGridWithBorder} from "base/ui/section/components";
import {LightHeading} from "base/ui/headings/components";
import Box from "@mui/material/Box";

const ContractCalendar = ({years, items, itemsLabel, itemComponent}) => {
    const findItemsForYear = (items, year) => {
        return items.filter(item => {
            if (item.itemDate) {
                return item.itemDate.getFullYear() === year;
            }
            return false;
        });
    };

    return (
        <ContainerGridWithBorder p={4}>
            <LightHeading>Calendario de {itemsLabel}</LightHeading>
            <Box mt={2}>
                {years.map(year => {
                    return (
                        <ContractCalendarYear
                            key={year}
                            year={year}
                            items={findItemsForYear(items, year)}
                            itemsLabel={itemsLabel}
                            itemComponent={itemComponent}
                        />
                    );
                })}
            </Box>
        </ContainerGridWithBorder>
    );
};

export default ContractCalendar;
