import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const EntityNoItemsComponent = ({isFilterEmpty = true}) => {
    const noElementsMessage = isFilterEmpty ? (
        "No existen elementos para mostrar."
    ) : (
        <>
            No se ha encontrado ningún elemento que coincida con su búsqueda.
            <br />
            Por favor, intente realizar otra búsqueda o borre los filtros activos.
        </>
    );

    return (
        <Grid container justifyContent="center" my={2}>
            <Typography sx={{fontStyle: "italic", textAlign: "center"}}>
                {noElementsMessage}
            </Typography>
        </Grid>
    );
};

export default EntityNoItemsComponent;
