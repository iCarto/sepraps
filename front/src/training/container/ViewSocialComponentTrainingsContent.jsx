import {SectionCard} from "base/ui/section/components";
import {CreateTrainingDataContent, ViewOrUpdateTrainingDataContent} from ".";
import Stack from "@mui/system/Stack";

const ViewSocialComponentTrainingsContent = ({socialComponent, trainings}) => {
    return (
        socialComponent && (
            <SectionCard title="Capacitaciones y asistencias técnicas">
                <Stack spacing={2}>
                    {trainings?.map(training => {
                        return (
                            <ViewOrUpdateTrainingDataContent
                                socialComponentId={socialComponent.id}
                                key={training.id}
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
