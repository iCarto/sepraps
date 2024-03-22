import {FieldUtil} from "base/ui/section/utilities";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const EntityCard = ({
    entity,
    entityFields,
    cardHeader = null,
    secondaryContent = null,
    onClick = null,
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(entity.id);
        }
    };

    const getFieldNote = (entityField, entity) => {
        return entityField.note ? entityField.note(entity) : null;
    };

    return (
        <Card
            id={entity.id}
            onClick={handleClick}
            sx={{cursor: onClick ? "pointer" : "inherit"}}
        >
            {cardHeader ? (
                cardHeader
            ) : (
                <CardContent>
                    <Typography variant="h5" gutterBottom color="primary">
                        {entity.name || entity.number}
                    </Typography>
                    <Typography variant="body2">{entity.comments}</Typography>
                </CardContent>
            )}
            <CardContent sx={{bgcolor: "grey.100"}}>
                {secondaryContent ? <Box mb={2}>{secondaryContent}</Box> : null}
                <Stack spacing={1}>
                    {entityFields.map((entityField, index) => {
                        const fieldNote = getFieldNote(entityField, entity);

                        return (
                            <Stack key={index} direction="row" spacing={2}>
                                <Tooltip title={entityField.label}>
                                    {entityField.icon}
                                </Tooltip>
                                <Typography variant="body2">
                                    {FieldUtil.getValue(
                                        entityField.formatFunction(entity)
                                    )}
                                    {fieldNote ? (
                                        <Tooltip title={fieldNote}>
                                            <Typography component="span"> *</Typography>
                                        </Tooltip>
                                    ) : null}
                                </Typography>
                            </Stack>
                        );
                    })}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default EntityCard;
