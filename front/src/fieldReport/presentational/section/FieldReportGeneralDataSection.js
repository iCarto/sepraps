import {DateUtil} from "base/format/utilities";
import {SectionField} from "base/ui/section/components";
import {FieldReportForm} from "../form";

import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

const FieldReportGeneralDataSection = ({
    fieldReport,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onSubmit,
}) => {
    const section = "basic_data";

    const handleOpenForm = () => {
        onOpenForm(section);
    };

    const handleCancelForm = () => {
        onCloseForm(section);
    };

    return (
        <>
            {isFormOpen ? (
                <FieldReportForm
                    fieldReport={fieldReport}
                    section={section}
                    onSubmit={onSubmit}
                    onCancel={handleCancelForm}
                />
            ) : (
                <Grid container>
                    <Grid item xs>
                        <SectionField label="Nombre" value={`${fieldReport?.name}`} />
                        <SectionField
                            label="Nº de memorandum"
                            value={`${fieldReport?.code}`}
                        />
                        <SectionField
                            label="Fechas de la intervención"
                            value={`${DateUtil.formatDate(
                                fieldReport?.visit_date_start
                            )} - ${DateUtil.formatDate(fieldReport?.visit_date_end)}`}
                        />
                        <SectionField
                            label="Autor/a"
                            value={`${fieldReport.reporting_person_name} - ${fieldReport.reporting_person_role}`}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={"auto"}
                        container
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <IconButton onClick={handleOpenForm}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default FieldReportGeneralDataSection;
