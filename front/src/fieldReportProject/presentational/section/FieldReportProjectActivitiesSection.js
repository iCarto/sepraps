import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {FieldReportProjectActivityService} from "fieldReportProjectActivity/service";
import {fieldReportProjectActivity_view_adapter} from "fieldReportProjectActivity/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {AddNewFullWidthButton} from "base/shared/components";
import {AlertError} from "base/error/components";
import {FieldReportProjectActivityForm} from "fieldReportProjectActivity/presentational/form";
import {FieldReportProjectActivitySection} from "fieldReportProjectActivity/presentational/section";

import Grid from "@mui/material/Grid";
import {DocumentService} from "base/file/service";

const FieldReportProjectActivitiesSection = ({
    activities,
    isFormSectionActive,
    onOpenForm,
    onCloseForm,
}) => {
    const section = "activities";

    const [isFormNewOpen, setIsFormNewOpen] = useState(false);
    const [isFormEditOpen, setIsFormEditOpen] = useState(false);
    const [error, setError] = useState("");

    const {fieldReportProjectId} = useParams();
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

    const handleSubmit = createdActivity => {
        FieldReportProjectActivityService.create(
            fieldReportProjectActivity_view_adapter({
                ...createdActivity,
                field_report_project: parseInt(fieldReportProjectId),
            })
        ).then(resultActivity => {
            const imagesUploadPromises = createdActivity.images.map(image => {
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
                            resultActivity.folder,
                            onFinish,
                            () => {},
                            () => {},
                            onError
                        );
                    });
                }
                return Promise.resolve();
            });
            Promise.all(imagesUploadPromises)
                .then(result => {
                    createdActivity.images.forEach((image, index) => {
                        const storedImageId =
                            image instanceof File
                                ? result.find(
                                      storedImage =>
                                          storedImage &&
                                          storedImage.media_name === image.name
                                  ).id
                                : image.id;
                        const imageAttribute = "image" + (index + 1);
                        resultActivity = {
                            ...resultActivity,
                            [imageAttribute]: storedImageId,
                        };
                    });
                    FieldReportProjectActivityService.update(
                        fieldReportProjectActivity_view_adapter({
                            ...resultActivity,
                            field_report_project: parseInt(fieldReportProjectId),
                        })
                    )
                        .then(() => {
                            navigate(basePath, true);
                        })
                        .catch(error => {
                            console.log(error);
                            setError(error);
                        });
                })
                .catch(error => {
                    console.log(error);
                    setError(error);
                });
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
                <>
                    <AlertError error={error} />
                    <FieldReportProjectActivityForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancelForm}
                    />
                </>
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
