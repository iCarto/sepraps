import {DateUtil} from "base/format/utilities";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const ContractCalendarMonth = ({month, items, itemComponent: ItemComponent}) => {
    return (
        <Box
            sx={{
                p: 1,
                border: 1,
                borderColor: "grey.200",
                borderRadius: 2,
                height: "100%",
                minHeight: "50px",
            }}
        >
            <Stack>
                <Typography variant="caption" color="grey.400">
                    {DateUtil.getMonthName(month + 1)}
                </Typography>
                <Divider />
                {items.map(item => {
                    return <ItemComponent key={item.id} item={item} />;
                })}
            </Stack>
        </Box>
    );
};

export default ContractCalendarMonth;
