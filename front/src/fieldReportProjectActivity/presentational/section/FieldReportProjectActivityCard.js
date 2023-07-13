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

const FieldReportProjectActivityCard = ({activity, index, onEdit, onDelete}) => {
    const handleClickEdit = activity => {
        onEdit(activity);
    };

    const handleClickDelete = activity => {
        console.log("delete");
        onDelete(activity);
    };

    return (
        <div key={index}>
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
                    <IconButton onClick={() => handleClickEdit(activity)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleClickDelete(activity)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider sx={{mb: 2}} />
            <Typography variant="body1" color="text.primary" gutterBottom>
                {activity.notes}
            </Typography>
            {activity?.images?.length ? (
                <Grid container spacing={1} pt={2}>
                    {activity.images.map((image, imageIndex) => (
                        <Grid item key={imageIndex} xs={6} lg={3}>
                            <ImageListItem key={image}>
                                <ImagePreview
                                    path={image}
                                    sx={{
                                        borderRadius: 1,
                                    }}
                                />
                                <ImageListItemBar
                                    subtitle={`Imagen ${imageIndex + 1}`}
                                    sx={{
                                        transform: "translateY(-6px)",
                                        borderRadius: "0 0 5px 5px",
                                    }}
                                />
                            </ImageListItem>
                        </Grid>
                    ))}
                </Grid>
            ) : null}
        </div>
    );
};

export default FieldReportProjectActivityCard;
