import {useState} from "react";

import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ProviderService} from "provider/service";
import {provider_view_adapter} from "provider/model";
import {FormContainer} from "base/form/components";

import EditIcon from "@mui/icons-material/Edit";
import {
    ProviderForm,
    ProviderFormGeneralDataFields,
} from "provider/presentational/form";
import {ProviderGeneralDataSection} from "provider/presentational/section";

const ViewOrUpdateProviderGeneralDataContent = ({provider}) => {
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
            return <ProviderGeneralDataSection provider={provider} />;
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
                        <ProviderFormGeneralDataFields />
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
        <SectionCard title="Información" secondaryActions={actions}>
            {getComponent(mode)}
        </SectionCard>
    );
};

export default ViewOrUpdateProviderGeneralDataContent;
