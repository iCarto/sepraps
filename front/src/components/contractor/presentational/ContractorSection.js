import {useNavigate} from "react-router-dom";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";

import Typography from "@mui/material/Typography";
import LocationOn from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ContractorSection = ({contractor, hideButtons = null}) => {
    const navigate = useNavigate();

    const headerActions = contractor.id
        ? [
              <SectionCardHeaderAction
                  key="edit"
                  name="edit"
                  title="Modificar"
                  icon={<EditIcon />}
                  onClick={() => {
                      navigate("contractor/edit");
                  }}
              />,
          ]
        : [
              <SectionCardHeaderAction
                  key="add"
                  name="add"
                  title="Añadir"
                  icon={<AddCircleOutlineIcon />}
                  onClick={() => {
                      navigate("contractor/add");
                  }}
              />,
          ];

    return (
        <SectionCard
            title="Contratista"
            headerActions={!hideButtons ? headerActions : null}
        >
            {contractor.id ? (
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
                </>
            ) : (
                <Typography style={{fontStyle: "italic"}}>
                    No se ha asignado contratista al contrato todavía
                </Typography>
            )}
        </SectionCard>
    );
};

export default ContractorSection;
