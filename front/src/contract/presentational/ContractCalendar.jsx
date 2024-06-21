import {ContractCalendarYear} from "./";
import {ContainerGridWithBorder} from "base/ui/section/components";
import {LightHeading} from "base/ui/headings/components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Plural, Trans} from "@lingui/macro";
import Stack from "@mui/material/Stack";

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
            <Stack>
                <LightHeading>
                    <Trans>Calendario de certificaciones</Trans>
                </LightHeading>
                <Typography variant="caption">
                    <Plural
                        value={items.length}
                        _0="No se han creado certificaciones"
                        one="Existe <strong>#</strong> certificación creada"
                        other="Existen <strong>#</strong> certificaciones creadas"
                    />
                </Typography>
            </Stack>
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
