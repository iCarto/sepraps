import {DateUtil} from "base/format/utilities";
import {ImagePreview} from "base/image/components";
import {AddNewButtonFullWidthButton} from "base/shared/components";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const FieldReportProjectActivitiesSection = ({activities}) => {
    return (
        <>
            {activities?.map((activity, activityIndex) => (
                <div key={activityIndex}>
                    <Stack
                        flexDirection={"row"}
                        alignItems={"baseline"}
                        pt={activityIndex === 0 ? 0 : 3}
                    >
                        <Typography
                            variant="h6"
                            component="h4"
                            sx={{pr: "12px", color: "primary.main", fontWeight: "500"}}
                            gutterBottom
                        >
                            {activity.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {`${DateUtil.formatDate(activity.date)}`}
                        </Typography>
                    </Stack>
                    <Typography variant="body1" color="text.primary" gutterBottom>
                        {activity.notes}
                    </Typography>
                    <Grid container spacing={1} pt={2}>
                        {activity.images?.map((image, imageIndex) => (
                            <Grid item key={imageIndex} xs={6} lg={3}>
                                <ImagePreview
                                    path={image.path}
                                    alt={image.comment}
                                    sx={{
                                        borderRadius: 1,
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ))}
            <Grid sx={{mt: 2}}>
                <AddNewButtonFullWidthButton />
            </Grid>
        </>
    );
};

export default FieldReportProjectActivitiesSection;
