import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";

import {ContractService} from "contract/service";
import {contract_view_adapter, createContract} from "contract/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ContactForm, ContactFormSearch} from "contact/presentational";
import {EntityUpdatePanel} from "base/entity/components/presentational";
import {contact_view_adapter} from "contact/model";

const CreateContractContactPanel = ({area}) => {
    const {action} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const basePath = `/contracts/list/${contract.id}/${area}_staff`;

    const allowedPosts = [
        "residente_obra",
        "fiscal_obra",
        "supervisor_obra",
        "coordinador_social",
        "supervisor_social",
        "otro_contacto",
    ];

    const handleSubmit = data => {
        console.log({data});

        handleFormSubmit(data);
    };

    const handleFormSubmit = contact => {
        ContractService.createContact(contract.id, contact_view_adapter({...contact}))
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleAddExistingSubmit = existingContact => {
        ContractService.createContact(contract.id, {...existingContact})
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(basePath);
    };

    return (
        <EntityUpdatePanel
            title="Asignar contacto"
            form={
                action === "existing" ? (
                    <ContactFormSearch
                        allowedPosts={allowedPosts}
                        onSubmit={handleAddExistingSubmit}
                    />
                ) : (
                    <ContactForm allowedPosts={allowedPosts} onSubmit={handleSubmit} />
                )
            }
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default CreateContractContactPanel;
