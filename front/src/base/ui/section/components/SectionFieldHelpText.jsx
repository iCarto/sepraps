import FormHelperText from "@mui/material/FormHelperText";

const SectionFieldHelpText = ({text = null}) => {
    return text && <FormHelperText sx={{color: "error.main"}}>{text}</FormHelperText>;
};

export default SectionFieldHelpText;
