import {DateUtil} from "base/format/utilities";
import {ImagePreview} from "base/image/components";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import {UserAuthRequired} from "base/user/utilities";

const FieldReportProjectActivityCard = ({
    activity,
    index,
    onEdit = null,
    onDelete = null,
}) => {
    const handleClickEdit = () => {
        onEdit();
    };

    const handleClickDelete = () => {
        onDelete();
    };

    return (
        <div key={index} style={{marginBottom: "24px"}}>
            <Grid
                container
                columnSpacing={1}
                justifyContent="space-between"
                alignItems="flex-end"
                pt={index === 0 ? 2 : 5}
            >
                <Grid item container xs={10} columnSpacing={1} alignItems="flex-end">
                    <Grid item width="fit-content">
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {`${DateUtil.formatDate(activity.date)}`}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography
                            variant="h6"
                            component="h4"
                            sx={{
                                fontSize: "16px",
                                lineHeight: "1.25",
                                fontWeight: "500",
                            }}
                            gutterBottom
                        >
                            {activity.title}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    xs="auto"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    color="text.secondary"
                >
                    {onEdit && (
                        <UserAuthRequired user={activity?.created_by}>
                            <IconButton onClick={handleClickEdit}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </UserAuthRequired>
                    )}
                    {onDelete && (
                        <UserAuthRequired user={activity?.created_by}>
                            <IconButton onClick={handleClickDelete}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </UserAuthRequired>
                    )}
                </Grid>
            </Grid>
            <Divider sx={{mb: 2}} />
            <Typography
                variant="body1"
                color="text.primary"
                sx={{whiteSpace: "pre-wrap"}}
                gutterBottom
            >
                {activity.notes}
            </Typography>
            <Grid container spacing={5} pt={2}>
                {[1, 2, 3, 4].map(
                    imageIndex =>
                        activity[`image${imageIndex}`] && (
                            <Grid item key={imageIndex} xs={6} lg={3}>
                                <ImageListItem>
                                    <ImagePreview
                                        path={activity[`image${imageIndex}`]}
                                        sx={{
                                            borderRadius: 1,
                                        }}
                                    />
                                    <ImageListItemBar
                                        subtitle={`Imagen ${imageIndex}`}
                                        sx={{
                                            transform: "translateY(-6px)",
                                            borderRadius: "0 0 5px 5px",
                                        }}
                                    />
                                </ImageListItem>
                            </Grid>
                        )
                )}
            </Grid>
        </div>
    );
};

export default FieldReportProjectActivityCard;
