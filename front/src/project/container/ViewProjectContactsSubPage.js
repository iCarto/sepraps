import {useOutletContext} from "react-router-dom";

import {EntityViewSubPage} from "base/entity/components/container";
import {ContractContactsSection} from "contract/presentational/section";
import {ProviderContactsSection} from "provider/presentational/section";

const ViewProjectContactsSubPage = () => {
    let project;
    [project] = useOutletContext();

    return (
        project && (
            <EntityViewSubPage
                sections={[
                    <ProviderContactsSection
                        providerId={project.provider?.id}
                        title="Prestador de servicio"
                        hideActions={true}
                    />,
                    <ContractContactsSection
                        contractId={project.construction_contract?.id}
                        contractor={project.construction_contract?.contractor}
                        title="Contrato de obras"
                        hideActions={true}
                    />,
                ]}
            />
        )
    );
};

export default ViewProjectContactsSubPage;
