import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";

import {AddNewFullWidthButton} from "base/shared/components";
import {FieldReportProjectActivityForm} from "fieldReportProjectActivity/presentational/form";

import {FieldReportProjectActivityService} from "fieldReportProjectActivity/service";
import {fieldReportProjectActivity_view_adapter} from "fieldReportProjectActivity/model";
import {FieldReportProjectActivitySection} from ".";
import Grid from "@mui/material/Grid";

const FieldReportProjectActivitiesSection = ({
    activities,
    isFormOpen,
    onOpenForm,
    onCloseForm,
}) => {
    const section = "activities";

    const [ifFormNewOpen, setIsFormNewOpen] = useState(isFormOpen === section);
    const [isFormEditOpen, setIsFormEditOpen] = useState(isFormOpen === section);

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
                    isFormOpen={isFormOpen && isFormEditOpen}
                />
            ))}
            <FieldReportProjectActivityForm
                onSubmit={handleSubmit}
                onCancel={handleCancelForm}
                display={isFormOpen && ifFormNewOpen}
            />
            <Grid mt={2} display={isFormOpen ? "none" : "inherit"}>
                <AddNewFullWidthButton onClick={handleClickNew} />
            </Grid>
        </>
    );
};

export default FieldReportProjectActivitiesSection;
