import {DateUtil} from "base/format/utilities";
import {SectionField} from "base/ui/section/components";
import {FormContainer} from "base/form/components";
import {FieldReportForm} from "../form";

import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import {UserAuthRequired} from "base/user/utilities";

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
                <FormContainer>
                    <FieldReportForm
                        fieldReport={fieldReport}
                        section={section}
                        onSubmit={onSubmit}
                        onCancel={handleCancelForm}
                    />
                </FormContainer>
            ) : (
                <Grid container>
                    <Grid item xs>
                        <SectionField label="Nombre" value={`${fieldReport?.name}`} />
                        <SectionField
                            label="Número de memorándum"
                            value={`${fieldReport?.code}`}
                        />
                        <SectionField
                            label="Fecha del informe"
                            value={DateUtil.formatDate(fieldReport.date)}
                        />
                        <SectionField
                            label="Fechas de la intervención"
                            value={`${DateUtil.formatDate(
                                fieldReport?.visit_date_start
                            )} - ${DateUtil.formatDate(fieldReport?.visit_date_end)}`}
                        />
                        <SectionField
                            label="Autor/a"
                            value={`${fieldReport.reporting_person}`}
                        />
                    </Grid>
                    <UserAuthRequired user={fieldReport.created_by}>
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
                    </UserAuthRequired>
                </Grid>
            )}
        </>
    );
};

export default FieldReportGeneralDataSection;
