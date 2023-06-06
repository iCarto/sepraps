import {useState} from "react";

import {useNavigateWithReload} from "base/navigation/hooks";
import {useAuth} from "base/user/provider";
import {ContractService} from "contract/service";
import {contract_view_adapter} from "contract/model";

import {EntityAddButtonGroup} from "base/entity/components/presentational";
import {RemoveItemDialog} from "base/delete/components";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import {ContractorContactsSection} from "contractor/presentational";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import LinkOffIcon from "@mui/icons-material/LinkOff";

const ContractContractorSection = ({contract}) => {
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const contractor = contract.contractor;

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

    const handleRemoveContractor = () => {
        setIsRemoveDialogOpen(false);
        ContractService.update(
            contract_view_adapter({...contract, contractor: null})
        ).then(() => {
            navigate("/contracts/" + contract.id + "/summary", true);
        });
    };

    return (
        <SectionCard title="Contratista" secondaryActions={headerActions}>
            {contractor?.id ? (
                <>
                    <SectionField label="Nombre" value={contractor?.name} />
                    <SectionField
                        label="Tipo"
                        value={contractor?.contractor_type_label}
                    />
                    <SectionField label="Dirección" value={contractor?.address} />
                    <SectionField label="Celular" value={contractor?.phone} />
                    <SectionField label="E-mail" value={contractor?.email} />
                    <SectionField label="Observaciones" value={contractor?.comments} />
                    <ContractorContactsSection contractor={contractor} />
                    <RemoveItemDialog
                        isDialogOpen={isRemoveDialogOpen}
                        setIsDialogOpen={setIsRemoveDialogOpen}
                        onRemove={handleRemoveContractor}
                    />
                </>
            ) : (
                <Stack alignItems="center" spacing={2}>
                    <Typography style={{fontStyle: "italic"}}>
                        El contrato no tiene ningún contratista asignado
                    </Typography>
                    <EntityAddButtonGroup basePath="contractor/" />
                </Stack>
            )}
        </SectionCard>
    );
};

export default ContractContractorSection;
