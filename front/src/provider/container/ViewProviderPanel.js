import {useNavigate, useParams} from "react-router-dom";
import {ProviderService} from "provider/service";
import {DateUtil} from "base/format/utilities";

import {EntitySummaryPanel} from "base/entity/components/presentational";
import {SectionField} from "base/ui/section/components";

const ViewProviderPanel = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const getSectionData = provider => {
        return (
            <>
                <SectionField label="Área" value={provider.area_label} />
                <SectionField
                    label="Nº miembros de la Comisión Directiva"
                    value={provider.number_of_members}
                />
                <SectionField
                    label="Nº mujeres de la Comisión Directiva"
                    value={provider.number_of_women}
                />
                <SectionField label="Tipo" value={provider.type_label} />
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
            </>
        );
    };

    const handleClickDetail = () => {
        navigate(`/providers/${id}/summary`);
    };

    return (
        <EntitySummaryPanel
            service={ProviderService}
            id={id}
            title="Prestador de servicios"
            getSectionTitle={provider => provider?.name}
            getSectionData={getSectionData}
            onClickDetailButton={handleClickDetail}
        />
    );
};

export default ViewProviderPanel;
