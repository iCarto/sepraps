import {ContractorContactService} from "contractor/service";
import {ViewContactsList} from "contact/container";

import {AccordionLayout} from "base/shared/components";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Box from "@mui/material/Box";

const ContractorContactsSection = ({contractorId, hideActions = false}) => {
    return (
        <AccordionLayout
            accordionTitle="Plantel"
            accordionIcon={<PermContactCalendarIcon />}
            defaultExpanded={true}
        >
            <Box
                sx={{
                    p: 1,
                    borderRadius: 2,
                    border: 1,
                    borderColor: "grey.300",
                }}
            >
                <ViewContactsList
                    service={ContractorContactService}
                    basePath={"contractor_staff/"}
                    entityId={contractorId}
                    entityName="contratista"
                    hideActions={hideActions}
                />
            </Box>
        </AccordionLayout>
    );
};

export default ContractorContactsSection;
