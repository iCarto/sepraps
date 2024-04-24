import {useState} from "react";

import {AmendmentService} from "amendment/service";
import {amendment_view_adapter} from "amendment/model";

import {useNavigateWithReload} from "base/navigation/hooks";
import {DateUtil} from "base/format/utilities";

import {
    SectionCardHeaderAction,
    SubSectionCardHeader,
} from "base/ui/section/components";
import {DeleteItemDialog} from "base/delete/components";
import {AmendmentData} from "amendment/presentational";
import {AmendmentForm} from "amendment/presentational/form";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";

const ViewOrUpdateAmendmentDataContent = ({contract, amendment}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        AmendmentService.delete(amendment.id).then(() => {
            navigate("", true);
        });
    };

    const handleFormSubmit = amendment => {
        AmendmentService.update(amendment_view_adapter(amendment))
            .then(updatedAmendment => {
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
            return <AmendmentData amendment={amendment} contract={contract} />;
        }
        if (mode === "edit") {
            return (
                <AmendmentForm
                    contractId={contract?.id}
                    amendment={amendment}
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
                titleLabel="Adenda"
                titleValue={DateUtil.formatDate(amendment.signature_date)}
                icon={<TextSnippetOutlinedIcon />}
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

export default ViewOrUpdateAmendmentDataContent;
