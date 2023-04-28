import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "base/user/provider";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/section/components";
import {
    AddContractorButtonGroup,
    ContractorContactsSection,
} from "contractor/presentational";
import {RemoveContractContractorDialog} from "contractor/container";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import LinkOffIcon from "@mui/icons-material/LinkOff";

const ContractContractorSection = ({contract}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const contractor = contract.contractor;

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

    const headerActions = contractor?.id
        ? [
              <SectionCardHeaderAction
                  key="edit"
                  name="edit"
                  text="Modificar"
                  icon={<EditIcon />}
                  onClick={() => {
                      navigate("contractor/" + contractor?.id + "/edit");
                  }}
                  roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
              />,
              <SectionCardHeaderAction
                  key="remove"
                  name="remove"
                  text="Quitar"
                  icon={<LinkOffIcon />}
                  onClick={() => {
                      setIsRemoveDialogOpen(true);
                  }}
                  roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
              />,
          ]
        : null;

    return (
        <SectionCard title="Contratista" secondaryActions={headerActions}>
            {contractor?.id ? (
                <>
                    <SectionField label="Nombre" value={contractor?.name} />
                    <SectionField
                        label="Tipo"
                        value={contractor?.contractor_type_name}
                    />
                    <SectionField label="Dirección" value={contractor?.address} />
                    <SectionField label="Celular" value={contractor?.phone} />
                    <SectionField label="E-mail" value={contractor?.email} />
                    <SectionField label="Observaciones" value={contractor?.comments} />
                    <ContractorContactsSection
                        contractor={contractor}
                        // isSidePanelOpen={isSidePanelOpen}
                    />
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