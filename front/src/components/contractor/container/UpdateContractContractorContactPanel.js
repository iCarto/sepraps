import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {createContractor} from "model";
import {ContractorService} from "service/api";

import {FormContactPanel} from "components/common/form";

const UpdateProjectContractorContactPanel = () => {
    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const handleFormData = data => {
        const updatedContractor = createContractor({
            id: contract.contractor.id,
            name: contract.contractor.name,
            contractor_type: contract.contractor.contractor_type,
            contractor_type_name: contract.contractor.contractor_type_name,
            phone: contract.contractor.phone,
            email: contract.contractor.email,
            contract: contract.id,
            contacts: [
                ...contract.contractor.contacts,
                {
                    id: data.contact_id,
                    name: data.contact_name,
                    post: data.contact_post,
                    post_name: data.contact_post_name,
                    gender: data.contact_gender,
                    phone: data.contact_phone,
                    email: data.contact_email,
                    comments: data.contact_comments,
                },
            ],
        });
        handleFormSubmit(updatedContractor);
    };

    const handleFormSubmit = contractor => {
        ContractorService.updateContractor(contractor)
            .then(() => {
                navigate(`/contracts/${contract.id}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    return (
        <FormContactPanel
            contextData={contract}
            handleFormData={handleFormData}
            error={error}
        />
    );
};

export default UpdateProjectContractorContactPanel;
