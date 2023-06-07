import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";

const ToggleFilterAccordionButton = ({
    clickHandler,
    isExpanded,
    buttonText = "Más filtros",
}) => {
    const filterButtonStyle = {
        textAlign: "left",
        lineHeight: 1.25,
        color: "text.secondary",
        marginBottom: 2,
    };

    return (
        <Button
            onClick={clickHandler}
            startIcon={<FilterListIcon />}
            sx={filterButtonStyle}
        >
            {!isExpanded ? buttonText : "Ocultar filtros"}
        </Button>
    );
};

export default ToggleFilterAccordionButton;
