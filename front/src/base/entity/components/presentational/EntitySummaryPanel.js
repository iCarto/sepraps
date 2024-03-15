import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {SidebarPanelLayout} from "base/ui/sidebar";
import {SectionCard} from "base/ui/section/components";
import {ImagePreview} from "base/image/components";
import {AlertError} from "base/error/components";
import {FeaturedDocumentDownload} from "base/file/components";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import LaunchIcon from "@mui/icons-material/Launch";

const EntitySummaryPanel = ({
    service,
    id,
    title,
    getSectionTitle,
    getSectionData,
    getSectionSubheader = null,
    onClickDetailButton = null,
    showClickDetailButton = entity => true,
    children = null,
}) => {
    const navigate = useNavigateWithReload();

    const [error, setError] = useState("");

    const location = useLocation();
    const basePath = location.pathname.split("/info/")[0];

    const [entity, setEntity] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setLoading(true);
        setEntity(null);
        setError(null);
        service
            .get(id)
            .then(entity => {
                setEntity(entity);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleClose = () => {
        navigate(`${basePath}`);
    };

    const handleClickDetail = entity => {
        if (onClickDetailButton) {
            onClickDetailButton(entity);
        }
    };

    return (
        <SidebarPanelLayout sidebarTitle={title} closeSidebarClick={handleClose}>
            {loading ? (
                <Grid item container justifyContent="center" my={6}>
                    <CircularProgress size={40} />
                </Grid>
            ) : (
                entity && (
                    <>
                        <SectionCard
                            title={getSectionTitle(entity)}
                            subheader={
                                getSectionSubheader ? getSectionSubheader(entity) : null
                            }
                            headingLabel={false}
                            dense
                        >
                            {entity.featured_image && (
                                <Box sx={{mb: 3}}>
                                    <ImagePreview
                                        path={entity.featured_image}
                                        alt={entity.name}
                                    />
                                </Box>
                            )}
                            <AlertError error={error} />
                            {getSectionData(entity)}
                            {entity.featured_document && (
                                <Grid container justifyContent="center" sx={{mt: 2}}>
                                    <FeaturedDocumentDownload
                                        featuredDocument={entity.featured_document}
                                    />
                                </Grid>
                            )}
                        </SectionCard>
                        {onClickDetailButton && showClickDetailButton(entity) && (
                            <Grid container justifyContent="center" sx={{mt: 2}}>
                                <Button
                                    variant="contained"
                                    sx={{ml: 3}}
                                    onClick={() => handleClickDetail(entity)}
                                    startIcon={<LaunchIcon />}
                                >
                                    Ver detalle
                                </Button>
                            </Grid>
                        )}
                        {children}
                    </>
                )
            )}
        </SidebarPanelLayout>
    );
};

export default EntitySummaryPanel;
