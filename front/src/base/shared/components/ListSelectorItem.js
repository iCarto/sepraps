import {TextLink} from "base/navigation/components";

import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/material/Box";

const ListSelectorItem = ({
    to,
    heading,
    headingFontSize = null,
    subHeading = null,
    icon = null,
    selected = false,
}) => {
    return (
        <ListItem
            disablePadding
            sx={{
                py: 1,
                backgroundColor: selected ? "secondary.lighter" : "white",
                borderRight: selected ? 3 : 0,
                borderRightColor: selected ? "primary.main" : "inherit",
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{width: "100%"}}
            >
                <Stack direction="row" alignItems="center">
                    <KeyboardArrowLeftIcon
                        sx={{
                            color: selected ? "primary.main" : "grey.400",
                            mr: 1,
                        }}
                    />
                    <Stack>
                        <TextLink
                            text={heading}
                            to={to}
                            textStyle={{
                                fontWeight: selected ? "bold" : "inherit",
                                color: selected ? "inherit" : "grey.500",
                                fontSize: headingFontSize ? headingFontSize : "inherit",
                            }}
                        />
                        {subHeading && (
                            <Typography sx={{fontSize: 10, color: "grey.500"}}>
                                {subHeading}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
                <Box sx={{px: 1}}>{icon}</Box>
            </Stack>
        </ListItem>
    );
};

export default ListSelectorItem;
