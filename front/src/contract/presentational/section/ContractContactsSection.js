import {ContractContactService} from "contract/service";
import {ViewContactsList} from "contact/container";
import {SectionCard} from "base/ui/section/components";
import {ContractorContactService} from "contractor/service";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ContractContactsSection = ({
    contractId,
    contractor = null,
    area = null,
    title = "Plantel",
    hideActions = false,
}) => {
    return (
        <SectionCard title={title}>
            <ViewContactsList
                area={area}
                service={ContractContactService}
                basePath={""}
                entityId={contractId}
                entityName="contrato"
                filter={{area: area}}
                hideActions={hideActions}
            />
            {contractor && (
                <Box sx={{mt: 1}}>
                    <Typography sx={{ml: 1, color: "grey.500"}}>
                        Contratista: {contractor.name}
                    </Typography>
                    <ViewContactsList
                        service={ContractorContactService}
                        basePath={""}
                        entityId={contractor.id}
                        entityName="contratista"
                        hideActions={hideActions}
                    />
                </Box>
            )}
        </SectionCard>
    );
};

export default ContractContactsSection;
