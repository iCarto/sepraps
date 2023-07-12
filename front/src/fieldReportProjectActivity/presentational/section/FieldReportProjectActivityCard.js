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
        <>
            <div key={index}>
                <Grid
                    container
                    columnSpacing={1}
                    justifyContent={"space-between"}
                    pt={index === 0 ? 0 : 3}
                >
                    <Grid item container xs alignItems="baseline">
                        <Typography
                            variant="h6"
                            component="h4"
                            sx={{
                                pr: "12px",
                                color: "primary.dark",
                                fontWeight: "500",
                            }}
                            gutterBottom
                        >
                            {activity.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {`${DateUtil.formatDate(activity.date)}`}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        xs="auto"
                        justifyContent="flex-end"
                        alignItems="center"
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
                                    />
                                </ImageListItem>
                            </Grid>
                        ))}
                    </Grid>
                ) : null}
            </div>
        </>
    );
};

export default FieldReportProjectActivityCard;
