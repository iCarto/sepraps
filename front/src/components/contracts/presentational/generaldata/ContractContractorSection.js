import {useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import {AddContractorButtonGroup} from "components/contractor/presentational";

import ContractorContactsSection from "components/contractor/presentational/ContractorContactsSection";
import {RemoveContractContractorDialog} from "components/contractor/container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ContractContractorSection = () => {
    const navigate = useNavigate();
    let contract;
    [contract] = useOutletContext();
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
                      navigate("contractor/" + contractor.id + "/edit");
                  }}
              />,
              <SectionCardHeaderAction
                  key="remove"
                  name="remove"
                  text="Quitar"
                  icon={<DeleteIcon />}
                  onClick={() => {
                      setIsRemoveDialogOpen(true);
                  }}
              />,
          ]
        : null;

    return (
        <SectionCard title="Contratista" secondaryActions={headerActions}>
            {contractor?.id ? (
                <>
                    <SectionField label="Nombre:" value={contractor.name} />
                    <SectionField
                        label="Tipo:"
                        value={contractor.contractor_type_name}
                    />
                    <SectionField label="Teléfono:" value={contractor.phone} />
                    <SectionField
                        label="Correo electrónico:"
                        value={contractor.email}
                    />
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
                        El contrato no tiene un contratista asignado
                    </Typography>
                    <AddContractorButtonGroup />
                </Stack>
            )}
        </SectionCard>
    );
};

export default ContractContractorSection;
