import {SectionCard} from "base/ui/section/components";
import {CreateTrainingDataContent, ViewOrUpdateTrainingDataContent} from ".";
import Stack from "@mui/system/Stack";

const ViewSocialComponentTrainingsContent = ({socialComponent, trainings}) => {
    return (
        socialComponent && (
            <SectionCard title="Capacitaciones">
                <Stack spacing={2}>
                    {trainings?.map(training => {
                        return (
                            <ViewOrUpdateTrainingDataContent
                                key={training.id}
                                socialComponentId={socialComponent.id}
                                training={training}
                            />
                        );
                    })}
                    <CreateTrainingDataContent socialComponentId={socialComponent.id} />
                </Stack>
            </SectionCard>
        )
    );
};

export default ViewSocialComponentTrainingsContent;
