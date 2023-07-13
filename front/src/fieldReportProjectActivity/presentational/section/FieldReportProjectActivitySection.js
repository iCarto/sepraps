import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {FieldReportProjectActivityService} from "fieldReportProjectActivity/service";
import {fieldReportProjectActivity_view_adapter} from "fieldReportProjectActivity/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {AlertError} from "base/error/components";
import {FieldReportProjectActivityForm} from "fieldReportProjectActivity/presentational/form";
import {FieldReportProjectActivityCard} from "fieldReportProjectActivity/presentational/section";

import Grid from "@mui/material/Grid";

const FieldReportProjectActivitySection = ({
    activity,
    activityIndex,
    isFormOpen,
    onOpenForm,
    onCloseForm,
}) => {
    const [activityToEditId, setActivityToEditId] = useState(false);
    const [error, setError] = useState("");

    const {fieldReportProjectId} = useParams();
    const basePath = useLocation();
    const navigate = useNavigateWithReload();

    const handleClickEdit = activity => {
        onOpenForm(activity.id);
        setActivityToEditId(activity.id);
    };

    const handleCancelForm = () => {
        onCloseForm();
    };

    const handleSubmit = activity => {
        FieldReportProjectActivityService.update(
            fieldReportProjectActivity_view_adapter({
                ...activity,
                field_report_project: fieldReportProjectId,
            })
        )
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleClickDelete = activity => {
        //TO-DO: Implement
        console.log(activity);
    };

    return (
        <>
            {isFormOpen && activityToEditId === activity.id ? (
                <Grid item mb={4} key={activityIndex}>
                    <AlertError error={error} />
                    <FieldReportProjectActivityForm
                        activity={activity}
                        onSubmit={handleSubmit}
                        onCancel={handleCancelForm}
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
