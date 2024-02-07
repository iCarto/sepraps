import {useState} from "react";
import {useLocation, useOutletContext} from "react-router-dom";

import {ContractService} from "contract/service";
import {useNavigateWithReload} from "base/navigation/hooks";

import {PaymentsFormWizard} from "payment/presentational/form";
import {DomainProvider} from "sepraps/domain/provider";
import {DateUtil} from "base/format/utilities";

const CreatePaymentsWizard = () => {
    const navigate = useNavigateWithReload();
    const {contract} = useOutletContext();
    const location = useLocation();
    const basePath = location.pathname.split("/wizard")[0];

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleCancel = () => {
        navigate(-1);
    };

    const onFormSubmit = data => {
        console.log({data});
        setSaving(true);
        ContractService.createPaymentsList(contract.id, data)
            .then(result => {
                navigate(`${basePath}/${result[0].id}`, true);
                setSaving(false);
            })
            .catch(error => {
                setSaving(false);
                setError(error);
                console.log({error});
            });
    };

    let startDate = new Date(contract.execution_start_date);
    let endDate = new Date(
        contract.amended_expected_execution_end_date ||
            contract.expected_execution_end_date
    );

    return (
        <DomainProvider>
            <PaymentsFormWizard
                onSubmit={onFormSubmit}
                onCancel={handleCancel}
                saving={saving}
                error={error}
                defaultFrecuencyType={contract.product_frequency_type}
                defaultNumberOfProducts={DateUtil.getMonths(startDate, endDate)}
                defaultStartDate={contract.execution_start_date}
            />
        </DomainProvider>
    );
};

export default CreatePaymentsWizard;
