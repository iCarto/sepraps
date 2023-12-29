import {SectionCard} from "base/ui/section/components";
import {
    CreateAmendmentDataContent,
    ViewOrUpdateAmendmentDataContent,
} from "amendment/container";
import Stack from "@mui/system/Stack";

const ViewContractAmendmentsContent = ({amendments, contract}) => {
    return (
        amendments && (
            <SectionCard title="Adendas">
                <Stack spacing={2}>
                    {amendments.map(amendment => {
                        return (
                            <ViewOrUpdateAmendmentDataContent
                                key={amendment.id}
                                contract={contract}
                                amendment={amendment}
                            />
                        );
                    })}
                    <CreateAmendmentDataContent contractId={contract?.id} />
                </Stack>
            </SectionCard>
        )
    );
};

export default ViewContractAmendmentsContent;
