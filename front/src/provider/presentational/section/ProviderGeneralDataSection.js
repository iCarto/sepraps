import {useAuth} from "base/user/provider";
import {EntityGeneralDataSection} from "base/entity/components/presentational/sections";

const ProviderGeneralDataSection = ({provider}) => {
    const {ROLES} = useAuth();

    const sections = [
        {
            label: "Nombre",
            value: provider.name,
        },
        {label: "Localidad", value: provider.locality.name},
        {
            label: "Distrito y departamento",
            value: `${provider.locality.district_name} (${provider.locality.department_name})`,
        },
        {label: "Área", value: provider.area},
    ];

    return (
        <>
            <EntityGeneralDataSection
                featured_image={provider.featured_image}
                featured_document={provider.featured_document}
                name={provider.name}
                sections={sections}
            />
        </>
    );
};

export default ProviderGeneralDataSection;
