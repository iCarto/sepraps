import {useState} from "react";

import {PaymentService} from "payment/service";
import {payment_view_adapter} from "payment/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {PaymentData} from "payment/presentational";
import {PaymentForm} from "payment/presentational/form";

import EditIcon from "@mui/icons-material/Edit";

const ViewOrUpdatePaymentDataContent = ({contract, payment}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleFormSubmit = payment => {
        return PaymentService.update(payment_view_adapter({...payment}))
            .then(updatedPayment => {
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
    ];

    const getComponent = mode => {
        if (mode === "view") {
            return <PaymentData payment={payment} />;
        }
        if (mode === "edit") {
            return (
                <PaymentForm
                    contract={contract}
                    payment={payment}
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
        <SectionCard title="Seguimiento" secondaryActions={actions}>
            {getComponent(mode)}
        </SectionCard>
    );
};

export default ViewOrUpdatePaymentDataContent;
