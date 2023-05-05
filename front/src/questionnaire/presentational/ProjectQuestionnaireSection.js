import {ViewProjectQuestionnaireInstance} from "questionnaire/container";
import {SectionCard} from "base/section/components";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const ProjectQuestionnaireSection = ({questionnaire, isLoading}) => {
    return (
        <SectionCard>
            {isLoading ? (
                <Grid item container justifyContent="center" xs={12}>
                    <CircularProgress color="inherit" size={20} />
                </Grid>
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
