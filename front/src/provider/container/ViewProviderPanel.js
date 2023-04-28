import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ProviderService} from "provider/service";
import {EntityViewPanel} from "base/entity/components";
import {SectionCard, SectionField} from "base/section/components";

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
                    <SectionField label="Localidad" value={provider.locality.name} />
                    <SectionField
                        label="Distrito"
                        value={provider.locality.district_name}
                    />
                    <SectionField
                        label="Departamento"
                        value={provider.locality.department_name}
                    />
                </SectionCard>
            </EntityViewPanel>
        )
    );
};

export default ViewProviderPanel;
