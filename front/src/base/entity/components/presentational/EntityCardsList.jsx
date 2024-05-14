import {useEffect, useState} from "react";

import {useList} from "base/entity/hooks";
import {Spinner} from "base/shared/components";
import {EntityNoItemsComponent} from "base/entity/components/presentational";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

const pageSize = parseInt(process.env.REACT_APP_PAGE_SIZE);

const EntityCardsList = ({service, entityCard, onSelectElement}) => {
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(false);

    const {filter, page, setPage, size, setSize, order} = useList();

    const noElements = !size;
    const isFilterEmpty = Object.values(filter).every(value => !value);

    useEffect(() => {
        console.log({filter, page, order});
        setLoading(true);
        const serviceCall = service.getPaginatedList(filter, page, order);
        serviceCall.then(data => {
            console.log({data});
            setElements(data.results);
            setSize(data.count);
            setLoading(false);
        });
    }, [filter, page, order]); // eslint-disable-line

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const EntityCard = entityCard;

    const entityCards = elements.map(element => {
        return (
            <Grid item xs={12} sm={6} md={4} xl={3} key={element.id}>
                <EntityCard
                    key={element.id}
                    entity={element}
                    onClick={onSelectElement}
                />
            </Grid>
        );
    });

    return loading ? (
        <Spinner />
    ) : noElements ? (
        <EntityNoItemsComponent isFilterEmpty={isFilterEmpty} />
    ) : (
        <>
            <Grid
                component="ul"
                container
                spacing={3}
                sx={{
                    display: "flex",
                    justifyContent: "left",
                    p: 0,
                    listStyleType: "none",
                }}
            >
                {entityCards}
            </Grid>
            {page && (
                <Grid container justifyContent="flex-end" sx={{mt: 3}}>
                    <Pagination
                        count={Math.ceil(size / pageSize)}
                        page={page}
                        onChange={handleChangePage}
                    />
                </Grid>
            )}
        </>
    );
};

export default EntityCardsList;
