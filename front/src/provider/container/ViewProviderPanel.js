import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ProviderService} from "provider/service";
import {EntityViewPanel} from "base/entity/components/presentational";
import {SectionCard, SectionField} from "base/ui/section/components";

const ViewProviderPanel = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [provider, setProvider] = useState(null);

    useEffect(() => {
        ProviderService.get(id).then(provider => {
            setProvider(provider);
        });
    }, [id]);

    const handleClickDetail = () => {
        navigate(`/providers/${provider.id}/summary`);
    };

    return (
        provider && (
            <EntityViewPanel onClickDetailButton={handleClickDetail} title="Prestador">
                <SectionCard title={provider.name}>
                    <SectionField label="Nombre" value={provider.name} />
                    <SectionField label="Área" value={provider.area_label} />
                    <SectionField label="Tipo" value={provider.type_label} />
                    <SectionField
                        label="Nº miembros"
                        value={provider.number_of_members}
                    />
                    <SectionField label="Nº mujeres" value={provider.number_of_women} />
                    <SectionField
                        label="Legalmente constituida"
                        value={provider.is_legalized_label}
                    />
                    {provider.is_legalized ? (
                        <>
                            <SectionField
                                label="Fecha de legalización"
                                value={provider.legalization_date}
                            />
                            <SectionField
                                label="Naturaleza jurídica"
                                value={provider.legal_status_label}
                            />
                            <SectionField
                                label="Nº personería jurídica/registro"
                                value={provider.legal_registry_code}
                            />
                        </>
                    ) : null}
                </SectionCard>
            </EntityViewPanel>
        )
    );
};

export default ViewProviderPanel;
