import {useState} from "react";

import {AmendmentService} from "amendment/service";
import {amendment_view_adapter} from "amendment/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {AmendmentForm} from "amendment/presentational/form";
import {AddNewInlineItemButton, AddNewInlineItemFormBox} from "base/shared/components";

const CreateAmendmentDataContent = ({contractId}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("button");
    const [error, setError] = useState(null);

    const handleFormSubmit = amendment => {
        AmendmentService.create(amendment_view_adapter(amendment))
            .then(createdAmendment => {
                setMode("button");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return mode === "button" ? (
        <AddNewInlineItemButton
            onClick={() => {
                setMode("create");
            }}
            label="Añadir nueva adenda"
        />
    ) : mode === "create" ? (
        <AddNewInlineItemFormBox label="Añadir nueva adenda">
            <AmendmentForm
                contractId={contractId}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                    setMode("button");
                }}
                error={error}
            />
        </AddNewInlineItemFormBox>
    ) : null;
};

export default CreateAmendmentDataContent;
