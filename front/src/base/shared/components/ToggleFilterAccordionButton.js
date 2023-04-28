import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";

const filterBtnStyle = {
    textAlign: "left",
    lineHeight: 1.25,
    color: "text.secondary",
};

const ToggleFilterAccordionButton = ({clickHandler, expanded}) => {
    return (
        <Button
            onClick={clickHandler}
            startIcon={<FilterListIcon />}
            sx={filterBtnStyle}
        >
            {!expanded ? "Más filtros" : "Ocultar filtros"}
        </Button>
    );
};

export default ToggleFilterAccordionButton;
