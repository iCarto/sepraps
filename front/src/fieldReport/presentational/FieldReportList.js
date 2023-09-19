import {styled} from "@mui/material/styles";
import {DateUtil} from "base/format/utilities";
import {TextLink} from "base/navigation/components";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {useEffect, useState} from "react";
import Divider from "@mui/material/Divider";

const CardContentNoPadding = styled(CardContent)(`
  padding: 3px 10px;
  &:last-child {
    padding-bottom: 0;
  }
`);

const FieldReportList = ({fieldReports, selectedFieldReportId, basePath}) => {
    const [fieldReportsList, setFieldReportsList] = useState([]);

    useEffect(() => {
        setFieldReportsList(fieldReports);
    }, [fieldReports]);

    const handleSearch = searchText => {
        const search = searchText.toLowerCase();
        console.log({search});
        const filtered = fieldReports.filter(fieldReport => {
            console.log(fieldReport.reporting_person);
            return (
                fieldReport.code.includes(search) ||
                fieldReport.reporting_person?.toLowerCase().includes(search)
            );
        });
        setFieldReportsList(filtered);
    };

    return (
        <Paper
            sx={{
                border: "1px",
                borderStyle: "solid",
                borderColor: "darkgray",
                p: 1,
                height: "calc(100vh - 180px)",
                overflow: "auto",
            }}
        >
            {/*<FormControl variant="outlined" sx={{mb: 2}}>
                <OutlinedInput
                    id="search-field-report-input"
                    type="text"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                            >
                                <SearchOutlinedIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    size="small"
                    onChange={event => {
                        handleSearch(event.target.value);
                    }}
                />
                </FormControl>*/}
            <Typography sx={{textAlign: "center"}}>Fecha del informe</Typography>
            <Divider />
            <Grid container direction="column" spacing={1} sx={{mt: 1}}>
                {fieldReportsList &&
                    fieldReportsList.map(fieldReport => (
                        <Grid item>
                            <Card
                                key={fieldReport.id}
                                elevation={3}
                                sx={{
                                    border: "1px",
                                    borderStyle:
                                        selectedFieldReportId === fieldReport.id
                                            ? "solid"
                                            : "none",
                                    borderColor: "#ccc",
                                    backgroundColor:
                                        selectedFieldReportId === fieldReport.id
                                            ? "secondary.lighter"
                                            : "inherit",
                                    p: 1,
                                    textAlign: "center",
                                }}
                            >
                                <CardContentNoPadding>
                                    <TextLink
                                        text={DateUtil.formatDate(fieldReport.date)}
                                        to={`${basePath}/${fieldReport.id.toString()}`}
                                        textStyle={{
                                            fontWeight:
                                                selectedFieldReportId === fieldReport.id
                                                    ? "bold"
                                                    : "inherit",
                                        }}
                                    />
                                </CardContentNoPadding>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Paper>
    );
};

export default FieldReportList;
