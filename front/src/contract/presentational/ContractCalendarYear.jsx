import {useState} from "react";

import {ContractCalendarMonth} from ".";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ContractCalendarYear = ({year, items, itemsLabel, itemComponent}) => {
    const [expanded, setExpanded] = useState(year === new Date().getFullYear());

    const findItemsForMonth = (items, year, month) => {
        return items.filter(item => {
            if (item.itemDate) {
                return (
                    item.itemDate.getMonth() === month &&
                    item.itemDate.getFullYear() === year
                );
            }
            return false;
        });
    };

    return (
        <Box>
            <Button
                startIcon={expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                onClick={() => {
                    setExpanded(!expanded);
                }}
                sx={{width: "100%", justifyContent: "flex-start"}}
            >
                <Typography>{year}</Typography>
                {items?.length > 0 && (
                    <Typography
                        sx={{
                            ml: 1,
                            textTransform: "lowercase",
                            color: "grey.500",
                            fontSize: "0.9em",
                        }}
                    >
                        ({items.length} {itemsLabel})
                    </Typography>
                )}
            </Button>
            <Divider />
            <Collapse in={expanded} timeout="auto" sx={{width: "100%"}}>
                <Grid container spacing={1} mt={0.5} mb={1}>
                    {[...Array(12).keys()].map(month => (
                        <Grid item xs={6} key={`${year}-${month}`}>
                            <ContractCalendarMonth
                                month={month}
                                items={findItemsForMonth(items, year, month)}
                                itemComponent={itemComponent}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Collapse>
        </Box>
    );
};

export default ContractCalendarYear;
