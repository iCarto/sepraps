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
import {UserAuthRequired} from "base/user/utilities";

const FieldReportProjectActivitiesSection = ({
    fieldReportProject,
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
        console.log({createdActivity});
        FieldReportProjectActivityService.create(
            fieldReportProjectActivity_view_adapter({
                ...createdActivity,
                field_report_project: parseInt(fieldReportProjectId),
                image1: null,
                image2: null,
                image3: null,
                image4: null,
            })
        ).then(resultActivity => {
            const imagesUploadPromises = [1, 2, 3, 4].map(imageIndex => {
                const image = createdActivity[`image${imageIndex}`];
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
                    let activityImages = {};
                    [1, 2, 3, 4].forEach(imageIndex => {
                        const image = createdActivity["image" + imageIndex];
                        if (image) {
                            const storedImageId =
                                image instanceof File
                                    ? result.find(
                                          storedImage =>
                                              storedImage &&
                                              storedImage.media_name === image.name
                                      ).id
                                    : image.id;
                            activityImages["image" + imageIndex] = storedImageId;
                        }
                    });
                    FieldReportProjectActivityService.update(
                        fieldReportProjectActivity_view_adapter({
                            ...resultActivity,
                            ...activityImages,
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
            {fieldReportProject?.field_report_project_activities?.map(
                (activity, index) => (
                    <FieldReportProjectActivitySection
                        activity={activity}
                        activityIndex={index}
                        onOpenForm={handleClickEdit}
                        onCloseForm={handleCancelForm}
                        isFormOpen={isFormSectionActive && isFormEditOpen}
                        key={index}
                    />
                )
            )}
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
                <UserAuthRequired user={fieldReportProject.created_by}>
                    <Grid mt={2}>
                        <AddNewFullWidthButton
                            onClick={handleClickNew}
                            tooltip="Añadir actividad"
                        />
                    </Grid>
                </UserAuthRequired>
            )}
        </>
    );
};

export default FieldReportProjectActivitiesSection;
