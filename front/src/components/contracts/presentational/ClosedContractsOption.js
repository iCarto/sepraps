import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const ClosedContractsOption = ({checked, handleChange}) => {
    const handleSwitchChange = event => {
        handleChange(event.target.checked);
    };

    return (
        <FormControlLabel
            control={<Switch checked={checked} onChange={handleSwitchChange} />}
            label="Ver archivados"
        />
    );
};

export default ClosedContractsOption;
