import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const EntityNoItemsComponent = ({isFilterEmpty = true}) => {
    const noElementsMessage = isFilterEmpty
        ? "No existen elementos para mostrar."
        : "No se ha encontrado ningún elemento que coincida con su búsqueda. Por favor, intente realizar otra búsqueda o borre los filtros activos.";

    return (
        <Grid container justifyContent="center" my={6}>
            <Typography py={12} sx={{fontStyle: "italic", textAlign: "center"}}>
                {noElementsMessage}
            </Typography>
        </Grid>
    );
};

export default EntityNoItemsComponent;