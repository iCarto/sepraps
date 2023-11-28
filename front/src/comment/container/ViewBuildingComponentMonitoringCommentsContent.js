import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";

import {CreateCommentDataContent, ViewOrUpdateCommentDataContent} from ".";
import {SectionCard} from "base/ui/section/components";

import Stack from "@mui/system/Stack";

const ViewBuildingComponentMonitoringCommentsContent = ({
    buildingComponentMonitoring,
}) => {
    return (
        buildingComponentMonitoring && (
            <SectionCard title="Gestor de comentarios">
                <Stack spacing={2}>
                    {buildingComponentMonitoring.comments.map(comment => {
                        return (
                            <ViewOrUpdateCommentDataContent
                                key={comment.id}
                                comment={comment}
                            />
                        );
                    })}
                    <CreateCommentDataContent
                        createService={comment =>
                            BuildingComponentMonitoringService.createComment(
                                buildingComponentMonitoring.id,
                                comment
                            )
                        }
                    />
                </Stack>
            </SectionCard>
        )
    );
};

export default ViewBuildingComponentMonitoringCommentsContent;
