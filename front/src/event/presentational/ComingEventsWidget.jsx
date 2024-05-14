import {Fragment, useState} from "react";
import {useNavigate} from "react-router-dom";
import {DateUtil} from "base/format/utilities";

import {ContainerGridWithBorder} from "base/ui/section/components";
import {LightHeading} from "base/ui/headings/components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Divider from "@mui/material/Divider";
import styled from "@mui/material/styles/styled";

const ComingEventsWidget = ({events}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const recordsPerPage = 4;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = events.slice(indexOfFirstRecord, indexOfLastRecord);

    const numberOfPages = Math.ceil(events.length / recordsPerPage);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const DateCardContainer = styled("div")(({theme}) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "80px",
        borderRadius: "4px",
        border: `1px solid ${theme.palette["primary"].main}`,
        color: "#fff",
        background: `${theme.palette["primary"].light}`,
        marginRight: "16px",
        lineHeight: 1.1,
        paddingTop: 5,
        paddingBottom: 5,
    }));

    const buttonStyle = {
        py: {xs: 0, xl: "inherit"},
        "&:hover": {
            backgroundColor: "primary.hover",
        },
    };

    return (
        <ContainerGridWithBorder p={4}>
            <LightHeading>Próximos eventos</LightHeading>
            {events.length ? (
                <List sx={{width: "100%", px: 0, pt: 2}} dense>
                    {currentRecords?.map(event => {
                        return (
                            <Fragment key={event.id}>
                                <ListItem sx={{px: 0}}>
                                    <ListItemButton
                                        sx={buttonStyle}
                                        onClick={() => {
                                            navigate(`${event.url}`);
                                        }}
                                    >
                                        <DateCardContainer>
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                    fontSize: "1.5em",
                                                }}
                                            >
                                                {DateUtil.getDayInDate(event.date)}
                                            </span>
                                            <span
                                                style={{
                                                    textTransform: "uppercase",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {DateUtil.getMonthInDate(event.date)}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: "0.7em",
                                                }}
                                            >
                                                {DateUtil.getYearInDate(event.date)}
                                            </span>
                                        </DateCardContainer>
                                        <ListItemText
                                            primaryTypographyProps={{
                                                fontWeight: "medium",
                                            }}
                                            primary={event.title}
                                            secondary={event.message}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <Divider
                                    variant="inset"
                                    component="li"
                                    sx={{ml: "85px"}}
                                />
                            </Fragment>
                        );
                    })}
                    {numberOfPages > 1 && (
                        <Pagination
                            count={numberOfPages}
                            page={currentPage}
                            onChange={handleChange}
                            sx={{mt: 3, ml: 2}}
                        />
                    )}
                </List>
            ) : (
                <Typography>No hay ninguna fecha próxima que destacar</Typography>
            )}
        </ContainerGridWithBorder>
    );
};

export default ComingEventsWidget;
