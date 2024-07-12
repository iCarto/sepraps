import {useState} from "react";

import {useNavigateWithReload} from "base/navigation/hooks";
import {ProviderService} from "provider/service";
import {provider_view_adapter} from "provider/model";

import {ProviderLegalDataSection} from "provider/presentational/section";
import {ProviderForm, ProviderFormLegalDataFields} from "provider/presentational/form";
import {FormContainer} from "base/form/components";
import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import EditIcon from "@mui/icons-material/Edit";

const ViewOrUpdateProviderLegalDataContent = ({provider}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleFormSubmit = provider => {
        return ProviderService.update(provider_view_adapter({...provider}))
            .then(updatedProvider => {
                setMode("view");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const getComponent = mode => {
        if (mode === "view") {
            return <ProviderLegalDataSection provider={provider} />;
        }
        if (mode === "edit") {
            return (
                <FormContainer>
                    <ProviderForm
                        provider={provider}
                        onSubmit={handleFormSubmit}
                        onCancel={() => {
                            setMode("view");
                        }}
                        error={error}
                    >
                        <ProviderFormLegalDataFields />
                    </ProviderForm>
                </FormContainer>
            );
        }
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
    ];

    return (
        <SectionCard title="Datos legales" secondaryActions={actions}>
            {getComponent(mode)}
        </SectionCard>
    );
};

export default ViewOrUpdateProviderLegalDataContent;
