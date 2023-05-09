import {useEffect, useState} from "react";

import {useList} from "../hooks";
import {ContractCard} from "contract/presentational";
import {ProjectCard} from "project/presentational";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const EntityCardsList = ({entityName = "", service, onSelectElement}) => {
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(false);

    const {filter, page, order} = useList();

    useEffect(() => {
        console.log({filter, page, order});
        setLoading(true);
        const serviceCall = service(filter, page, order);
        serviceCall.then(data => {
            console.log({data});
            setElements(data.results);
            setLoading(false);
        });
    }, [filter, page, order]);

    const noElements = !elements || elements.length === 0;
    const noElementsMessage =
        filter && filter.length === 0
            ? "No existen elementos para mostrar"
            : "No se ha encontrado ningún elemento que coincida con su búsqueda. Por favor, intente realizar otra búsqueda o borre los filtros activos.";

    const entityItems = elements.map(element => {
        // TO-DO: Extract bootstrapped code
        return (
            <Grid item xs={12} sm={6} md={4} xl={3} key={element.id}>
                {entityName === "contratos" ? (
                    <ContractCard
                        key={element.id}
                        contract={element}
                        onClick={onSelectElement}
                    />
                ) : (
                    <ProjectCard
                        key={element.id}
                        project={element}
                        onClick={onSelectElement}
                    />
                )}
            </Grid>
        );
    });

    return loading ? (
        <Grid item container justifyContent="center" my={6}>
            <CircularProgress size={40} />
        </Grid>
    ) : noElements ? (
        <Container sx={{textAlign: "center"}}>
            <Typography py={12} sx={{fontStyle: "italic"}}>
                {noElementsMessage}
            </Typography>
        </Container>
    ) : (
        <Grid
            component="ul"
            container
            spacing={3}
            sx={{display: "flex", justifyContent: "left", p: 0, listStyleType: "none"}}
        >
            {noElements ? (
                <Container sx={{mt: 3, textAlign: "center"}}></Container>
            ) : (
                entityItems
            )}
        </Grid>
    );
};

export default EntityCardsList;
