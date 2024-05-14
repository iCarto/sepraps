import {useEffect, useState} from "react";

import {DateUtil} from "base/format/utilities";
import {ContractService} from "contract/service";
import {FormSelect} from "base/form/components";

const PaymentFormSearch = ({contractId, isRequired = false}) => {
    const [contractPayments, setContractPayments] = useState([]);

    useEffect(() => {
        if (contractId)
            ContractService.getPaymentsList(contractId).then(items => {
                const payments = items.map(item => {
                    const paymentDate =
                        item.approval_date || item.expected_approval_date;

                    return {
                        value: item.id,
                        label: `${item.name} - ${DateUtil.formatDate(paymentDate)}`,
                    };
                });
                setContractPayments(payments);
            });
    }, [contractId]);

    return (
        <FormSelect
            name="payment"
            label="Producto"
            options={contractPayments}
            rules={isRequired ? {required: "Este campo es obligatorio"} : {}}
        />
    );
};

export default PaymentFormSearch;
