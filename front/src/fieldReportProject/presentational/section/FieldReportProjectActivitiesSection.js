import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {FieldReportProjectActivityService} from "fieldReportProjectActivity/service";
import {fieldReportProjectActivity_view_adapter} from "fieldReportProjectActivity/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {AddNewFullWidthButton} from "base/shared/components";
import {FieldReportProjectActivityForm} from "fieldReportProjectActivity/presentational/form";
import {FieldReportProjectActivitySection} from "fieldReportProjectActivity/presentational/section";

import Grid from "@mui/material/Grid";

const FieldReportProjectActivitiesSection = ({
    activities,
    isFormSectionActive,
    onOpenForm,
    onCloseForm,
}) => {
    const section = "activities";

    const [isFormNewOpen, setIsFormNewOpen] = useState(false);
    const [isFormEditOpen, setIsFormEditOpen] = useState(false);

    const {tab: projectId} = useParams();
    const basePath = useLocation();
    const navigate = useNavigateWithReload();

    const handleClickNew = () => {
        onOpenForm(section);
        setIsFormEditOpen(false);
        setIsFormNewOpen(true);
    };

    const handleClickEdit = () => {
        onOpenForm(section);
        setIsFormNewOpen(false);
        setIsFormEditOpen(true);
    };

    const handleCancelForm = () => {
        setIsFormNewOpen(false);
        setIsFormEditOpen(false);
        onCloseForm(section);
    };

    const handleSubmit = activity => {
        FieldReportProjectActivityService.create(
            fieldReportProjectActivity_view_adapter({
                ...activity,
                field_report_project: projectId,
            })
        )
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                // setError(error);
            });
    };

    return (
        <>
            {activities?.map((activity, index) => (
                <FieldReportProjectActivitySection
                    activity={activity}
                    activityIndex={index}
                    onOpenForm={handleClickEdit}
                    onCloseForm={handleCancelForm}
                    isFormOpen={isFormSectionActive && isFormEditOpen}
                />
            ))}
            {isFormSectionActive && isFormNewOpen ? (
                <FieldReportProjectActivityForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancelForm}
                />
            ) : null}
            {isFormSectionActive ? null : (
                <Grid mt={2}>
                    <AddNewFullWidthButton
                        onClick={handleClickNew}
                        tooltip="Añadir actividad"
                    />
                </Grid>
            )}
        </>
    );
};

export default FieldReportProjectActivitiesSection;
