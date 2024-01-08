import {useState} from "react";
import {TrainingService} from "training/service";
import {training_view_adapter} from "training/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {DateUtil} from "base/format/utilities";
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

const ViewOrUpdateTrainingDataContent = ({socialComponentId, training}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        TrainingService.delete(training.id).then(() => {
            navigate("", true);
        });
    };

    const handleFormSubmit = training => {
        TrainingService.update(training_view_adapter({...training}))
            .then(updatedTraining => {
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
                    socialComponentId={socialComponentId}
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
                titleValue={`${DateUtil.formatDate(training.start_date).toString()} - ${
                    training.target_population_label
                }`}
                icon={<LocalLibraryOutlinedIcon />}
                actions={actions}
            />
            <CardContent>{getComponent(mode)}</CardContent>
            <DeleteItemDialog
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </Card>
    );
};

export default ViewOrUpdateTrainingDataContent;
