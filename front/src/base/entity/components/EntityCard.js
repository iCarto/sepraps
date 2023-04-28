import {FieldUtil} from "base/section/utilities";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";

const EntityCard = ({entity, entityFields, cardHeader = null, onClick = null}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(entity.id);
        }
    };

    return (
        <Card
            id={entity.id}
            // variant="outlined"
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
                <Stack spacing={1}>
                    {entityFields.map((entityField, index) => (
                        <Stack key={index} direction="row" spacing={2}>
                            <Tooltip title={entityField.label}>
                                {entityField.icon}
                            </Tooltip>
                            <Typography variant="body2">
                                {FieldUtil.getValue(entityField.formatFunction(entity))}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default EntityCard;