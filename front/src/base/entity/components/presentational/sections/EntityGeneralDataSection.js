import {useNavigate} from "react-router-dom";
import {useAuth} from "base/user/provider";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import {FeaturedDocumentDownload} from "base/file/components";
import {ImagePreview} from "base/image/components";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

const EntityGeneralDataSection = ({
    featured_image = null,
    featured_document = null,
    name,
    sections = [],
}) => {
    const navigate = useNavigate();
    const {ROLES, hasRole} = useAuth();

    const displayFirstColumn = featured_image || featured_document;
    const sectionFields = sections.length
        ? sections.map((section, index) => (
              <SectionField
                  key={index}
                  label={`${section.label}`}
                  value={section.value}
                  unit={section.unit}
                  editButton={section.edit_button}
                  linkPath={section.linkPath}
              />
          ))
        : null;

    return (
        <SectionCard
            headingLabel={false}
            secondaryActions={
                !hasRole(ROLES.AUDITOR)
                    ? [
                          <SectionCardHeaderAction
                              key="edit"
                              name="edit"
                              text="Modificar"
                              icon={<EditIcon />}
                              onClick={() => {
                                  navigate(`generaldata/edit`);
                              }}
                              roles={[]}
                          />,
                      ]
                    : []
            }
        >
            <Grid container columnSpacing={2}>
                {displayFirstColumn && (
                    <Grid
                        item
                        container
                        md={4}
                        xl={3}
                        sx={{display: {xs: "none", md: "flex"}}}
                    >
                        {featured_image && (
                            <Grid item>
                                <div style={{position: "relative"}}>
                                    <ImagePreview
                                        path={featured_image}
                                        alt={name}
                                        sx={{
                                            borderRadius: 1,
                                        }}
                                    />
                                </div>
                            </Grid>
                        )}
                        {featured_document && (
                            <FeaturedDocumentDownload
                                featuredDocument={featured_document}
                            />
                        )}
                    </Grid>
                )}
                <Grid
                    item
                    container
                    md={displayFirstColumn ? 8 : 12}
                    xl={displayFirstColumn ? 9 : 12}
                    alignContent="flex-start"
                >
                    <Typography
                        variant="h4"
                        color="grey.700"
                        pb={2}
                        sx={{fontWeight: "bold", mt: -7}}
                    >
                        {name}
                    </Typography>
                    <Grid item xs={12}>
                        {sectionFields}
                    </Grid>
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default EntityGeneralDataSection;
