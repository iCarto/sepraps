import {useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import {
    AddContractorButtonGroup,
    ContractorContactsSection,
} from "components/contractor/presentational";
import {RemoveContractContractorDialog} from "components/contractor/container";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import LinkOffIcon from "@mui/icons-material/LinkOff";

const ContractContractorSection = ({isSidePanelOpen = null}) => {
    const navigate = useNavigate();
    let contract;
    [contract] = useOutletContext();
    const contractor = contract.contractor;

    console.log({contract});

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

    const headerActions = contractor?.id
        ? [
              <SectionCardHeaderAction
                  key="edit"
                  name="edit"
                  text="Modificar"
                  icon={<EditIcon />}
                  onClick={() => {
                      navigate("contractor/" + contractor.id + "/edit");
                  }}
              />,
              <SectionCardHeaderAction
                  key="remove"
                  name="remove"
                  text="Quitar"
                  icon={<LinkOffIcon />}
                  onClick={() => {
                      setIsRemoveDialogOpen(true);
                  }}
              />,
          ]
        : null;

    return (
        <SectionCard
            title="Contratista"
            secondaryActions={headerActions}
            isSidePanelOpen={isSidePanelOpen}
        >
            {contractor?.id ? (
                <>
                    <SectionField label="Nombre:" value={contractor.name} />
                    <SectionField
                        label="Tipo:"
                        value={contractor.contractor_type_name}
                    />
                    <SectionField label="Dirección:" value={contractor.address} />
                    <SectionField label="Teléfono:" value={contractor.phone} />
                    <SectionField
                        label="Correo electrónico:"
                        value={contractor.email}
                    />
                    <SectionField label="Observaciones:" value={contractor.comments} />
                    <ContractorContactsSection contractor={contractor} />
                    <RemoveContractContractorDialog
                        contract={contract}
                        isDialogOpen={isRemoveDialogOpen}
                        setIsDialogOpen={setIsRemoveDialogOpen}
                    />
                </>
            ) : (
                <Stack alignItems="center" spacing={2}>
                    <Typography style={{fontStyle: "italic"}}>
                        El contrato no tiene ningún contratista asignado
                    </Typography>
                    <AddContractorButtonGroup />
                </Stack>
            )}
        </SectionCard>
    );
};

export default ContractContractorSection;
