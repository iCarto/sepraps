import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {FieldReportProjectActivityService} from "fieldReportProjectActivity/service";
import {fieldReportProjectActivity_view_adapter} from "fieldReportProjectActivity/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {FieldReportProjectActivityForm} from "fieldReportProjectActivity/presentational/form";
import {FieldReportProjectActivityCard} from "fieldReportProjectActivity/presentational/section";

import Grid from "@mui/material/Grid";

const FieldReportProjectActivitySection = ({
    activity,
    activityIndex,
    onOpenForm,
    onCloseForm,
    isFormOpen,
}) => {
    const [activityToEditId, setActivityToEditId] = useState(false);

    const {tab: projectId} = useParams();
    const basePath = useLocation();
    const navigate = useNavigateWithReload();

    const handleClickEdit = activity => {
        onOpenForm(activity.id);
        setActivityToEditId(activity.id);
    };

    const handleCancelForm = () => {
        onCloseForm();
    };

    const handleClickDelete = activity => {
        //TO-DO: Implement
        console.log(activity);
    };

    const handleSubmit = activity => {
        FieldReportProjectActivityService.update(
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
            {isFormOpen && activityToEditId === activity.id ? (
                <Grid item mb={4} key={activityIndex}>
                    <FieldReportProjectActivityForm
                        activity={activity}
                        onSubmit={handleSubmit}
                        onCancel={handleCancelForm}
                        display={isFormOpen}
                    />
                </Grid>
            ) : (
                <FieldReportProjectActivityCard
                    key={activityIndex}
                    index={activityIndex}
                    activity={activity}
                    onEdit={handleClickEdit}
                    onDelete={handleClickDelete}
                />
            )}
        </>
    );
};

export default FieldReportProjectActivitySection;
