import {PageLayout} from "base/ui/main";
import {AlertError} from "base/error/components";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const EntityCreatePage = ({form, title, error = null}) => {
    return (
        <PageLayout subPage={true}>
            <Card
                sx={{border: 1, borderColor: "grey.300", maxWidth: "md", mx: "auto"}}
                elevation={3}
                component="section"
            >
                <CardHeader
                    title={
                        <Typography
                            color="primary.main"
                            sx={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                            }}
                            variant="h5"
                        >
                            {title}
                        </Typography>
                    }
                    sx={{bgcolor: "white", borderBottom: "1px solid #ccc"}}
                />
                <CardContent sx={{bgcolor: "grey.100"}}>
                    {error && <AlertError error={error} />}
                    {form}
                </CardContent>
            </Card>
        </PageLayout>
    );
};

export default EntityCreatePage;
