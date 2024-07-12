import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {FieldReportProjectActivityService} from "fieldReportProjectActivity/service";
import {DocumentService} from "base/file/service";
import {fieldReportProjectActivity_view_adapter} from "fieldReportProjectActivity/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useMenuGenericDeleteAction} from "base/ui/menu/hooks";

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

    const {
        dialog: deleteDialog,
        handleClickDelete: onClickDelete,
    } = useMenuGenericDeleteAction(element =>
        FieldReportProjectActivityService.delete(element.id)
    );

    const handleClickEdit = () => {
        onOpenForm(activity.id);
        setActivityToEditId(activity.id);
    };

    const handleCancelForm = () => {
        onCloseForm();
    };

    const callCallback = (callback, success) => {
        if (callback) {
            callback(success);
        }
    };

    const handleSubmit = (updatedActivity, callback = null) => {
        const imagesUploadPromises = [1, 2, 3, 4].map(imageIndex => {
            const image = updatedActivity[`image${imageIndex}`];
            if (image instanceof File) {
                return new Promise((resolve, reject) => {
                    const onFinish = onFinishResult => {
                        console.log({onFinishResult});
                        resolve(onFinishResult.response);
                    };
                    const onError = onFinishError => {
                        console.log({onFinishError});
                        reject(onFinishError);
                    };
                    DocumentService.upload(
                        image,
                        activity.folder,
                        onFinish,
                        () => {},
                        () => {},
                        onError
                    );
                });
            }
            return Promise.resolve();
        });
        return Promise.all(imagesUploadPromises)
            .then(result => {
                [1, 2, 3, 4].forEach(imageIndex => {
                    const image = updatedActivity["image" + imageIndex];
                    if (image) {
                        const storedImageId =
                            image instanceof File
                                ? result.find(
                                      storedImage =>
                                          storedImage &&
                                          storedImage.media_name === image.name
                                  ).id
                                : image.id;
                        updatedActivity["image" + imageIndex] = storedImageId;
                    }
                });
                return FieldReportProjectActivityService.update(
                    fieldReportProjectActivity_view_adapter({
                        ...updatedActivity,
                        field_report_project: parseInt(fieldReportProjectId),
                    })
                )
                    .then(() => {
                        callCallback(callback, true);
                        navigate(basePath, true);
                    })
                    .catch(error => {
                        callCallback(callback, false);
                        console.log(error);
                        setError(error);
                    });
            })
            .catch(error => {
                callCallback(callback, false);
                console.log(error);
                setError(error);
            });
    };

    const handleClickDelete = () => {
        onClickDelete(activity);
    };

    return (
        <>
            {deleteDialog}
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
