import {ViewProjectQuestionnaireInstance} from "questionnaire/container";
import {SectionCard} from "base/section/components";
import {Spinner} from "base/shared/components";

const ProjectQuestionnaireSection = ({questionnaire, isLoading}) => {
    return (
        <SectionCard>
            {isLoading ? (
                <Spinner />
            ) : (
                questionnaire && (
                    <ViewProjectQuestionnaireInstance
                        projectQuestionnaire={questionnaire}
                    />
                )
            )}
        </SectionCard>
    );
};

export default ProjectQuestionnaireSection;
