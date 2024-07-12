import {useState} from "react";
import {TrainingService} from "training/service";
import {training_view_adapter} from "training/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {
    SectionCardHeaderAction,
    SubSectionCardHeader,
} from "base/ui/section/components";
import {DeleteItemDialog} from "base/delete/components";
import {TrainingData, TrainingForm} from "training/presentational/form";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";
import {DuplicateTrainingDialog} from "training/presentational";

const ViewOrUpdateTrainingDataContent = ({socialComponentId, training}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false);

    const handleDelete = () => {
        TrainingService.delete(training.id).then(() => {
            navigate("", true);
        });
    };

    const handleDuplicate = () => {
        SocialComponentMonitoringService.createTraining(
            socialComponentId,
            training_view_adapter({
                ...training,
                id: null,
                name: `${training.name} (copia)`,
            })
        )
            .then(() => {
                setMode("view");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormSubmit = training => {
        return TrainingService.update(training_view_adapter({...training}))
            .then(() => {
                setMode("view");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const actions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                setMode("edit");
            }}
        />,
        <SectionCardHeaderAction
            key="duplicate"
            name="duplicate"
            text="Duplicar"
            icon={<ContentCopyOutlinedIcon />}
            onClick={() => {
                setIsDuplicateDialogOpen(true);
            }}
        />,
        <SectionCardHeaderAction
            key="delete"
            name="delete"
            text="Eliminar"
            icon={<DeleteIcon color="error" />}
            onClick={() => {
                setIsDeleteDialogOpen(true);
            }}
        />,
    ];

    const getComponent = mode => {
        if (mode === "view") {
            return <TrainingData training={training} />;
        }
        if (mode === "edit") {
            return (
                <TrainingForm
                    training={training}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
    };

    return (
        <Card sx={{border: 1, borderRadius: 2, borderColor: "grey.300"}} elevation={0}>
            <SubSectionCardHeader
                titleLabel="Actividad"
                titleValue={training.name}
                icon={<LocalLibraryOutlinedIcon />}
                actions={actions}
            />
            <CardContent>{getComponent(mode)}</CardContent>
            <DeleteItemDialog
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
                onDelete={handleDelete}
            />
            <DuplicateTrainingDialog
                isDialogOpen={isDuplicateDialogOpen}
                setIsDialogOpen={setIsDuplicateDialogOpen}
                onDelete={handleDuplicate}
                trainingName={training.name}
            />
        </Card>
    );
};

export default ViewOrUpdateTrainingDataContent;
