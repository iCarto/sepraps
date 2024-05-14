import {useState} from "react";
import {useLocation, useParams} from "react-router";
import {PaymentService} from "payment/service";
import {PaymentForm} from "payment/presentational/form";
import {payment_view_adapter} from "payment/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {SectionCard} from "base/ui/section/components";
import {useOutletContext} from "react-router-dom";

const CreatePaymentContent = () => {
    const navigate = useNavigateWithReload();
    const location = useLocation();
    const {id: contractId} = useParams();

    const {contract} = useOutletContext();

    const [error, setError] = useState(null);

    const handleFormSubmit = payment => {
        PaymentService.create(payment_view_adapter({...payment}))
            .then(createdPayment => {
                navigate(
                    location.pathname.replace("/new", `/${createdPayment.id}`),
                    true
                );
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <SectionCard title="Nuevo producto">
            <PaymentForm
                contract={contract}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                    navigate(-1);
                }}
                error={error}
            />
        </SectionCard>
    );
};

export default CreatePaymentContent;
