import {Fragment, useState} from "react";
import {useNavigate} from "react-router-dom";
import {DateUtil} from "utilities";

import {SectionCard} from "components/common/presentational";
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
        width: "60px",
        height: "60px",
        borderRadius: "4px",
        border: `1px solid ${theme.palette["primary"].main}`,
        color: "#fff",
        background: `${theme.palette["primary"].light}`,
        marginRight: "16px",
    }));

    const btnStyle = {
        py: {xs: 0, xl: "inherit"},
        "&:hover": {
            backgroundColor: "primary.hover",
        },
    };

    return (
        <SectionCard headingLabel={null} title="Próximos eventos">
            {events.length !== 0 ? (
                <List sx={{width: "100%", pr: 2, pt: 0, mt: -2}}>
                    {currentRecords?.map(event => {
                        return (
                            <Fragment key={event.id}>
                                <ListItem sx={{pl: "8px"}}>
                                    <ListItemButton
                                        sx={btnStyle}
                                        onClick={() => {
                                            navigate(`${event.url}`);
                                        }}
                                    >
                                        <DateCardContainer>
                                            <span>
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
                                        </DateCardContainer>
                                        <ListItemText
                                            primaryTypographyProps={{
                                                fontWeight: "medium",
                                            }}
                                            primary={event.title}
                                            secondary={
                                                event.message +
                                                ` dentro de ${DateUtil.getDaysToDate(
                                                    event.date
                                                )} días`
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <Divider
                                    variant="inset"
                                    component="li"
                                    sx={{ml: "100px"}}
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
        </SectionCard>
    );
};

export default ComingEventsWidget;
