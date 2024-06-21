import {useLinguiI18N} from "base/i18n/lingui/Lingui18NProvider";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const LanguageToggler = () => {
    const {selectedLocale, setSelectedLocale, availableLocales} = useLinguiI18N();

    const selectedValue = availableLocales.find(
        lang => lang.value === selectedLocale
    ).value;

    return (
        <FormControl size="small" sx={{width: "150px"}}>
            <Select
                value={selectedValue}
                onChange={e => setSelectedLocale(e.target.value)}
            >
                {availableLocales.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default LanguageToggler;
