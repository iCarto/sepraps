import {useNavigate} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {DateUtil} from "base/format/utilities";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import EditIcon from "@mui/icons-material/Edit";

const ProviderLegalDataSection = ({provider}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("legaldata/edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    return (
        <SectionCard title="Datos legales" secondaryActions={secondaryActions}>
            <SectionField label="Tipo de prestador" value={provider.type_label} />
            <SectionField
                label="Legalmente constituida"
                value={provider.is_legalized_label}
            />
            {provider.is_legalized ? (
                <SectionField
                    label="Fecha de legalización"
                    value={DateUtil.formatDate(provider.legalization_date)}
                />
            ) : null}
            <SectionField
                label="Contrato permisionario firmado"
                value={provider.is_provider_contract_signed_label}
            />
            {provider.type === "junta_de_saneamiento" ? (
                <SectionField
                    label="Nº de personería jurídica"
                    value={provider.legal_status_number}
                />
            ) : null}
            {provider.is_legalized && provider.type !== "junta_de_saneamiento" ? (
                <SectionField
                    label="Nº de resolución municipal"
                    value={provider.local_resolution_number}
                />
            ) : null}
        </SectionCard>
    );
};

export default ProviderLegalDataSection;
