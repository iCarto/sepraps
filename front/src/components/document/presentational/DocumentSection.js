import {DateUtil, FileUtil} from "utilities";

import {SectionCard, SectionField} from "components/common/presentational";
import ImagePreview from "./ImagePreview";
import Box from "@mui/material/Box";

const DocumentSection = ({folderElement}) => {
    return (
        folderElement && (
            <SectionCard title={folderElement.name}>
                {folderElement.content_type.startsWith("image") && (
                    <Box sx={{mb: 3}}>
                        <ImagePreview
                            path={folderElement.url}
                            alt={folderElement.name}
                        />
                    </Box>
                )}
                <SectionField
                    label="Tamaño del archivo:"
                    value={FileUtil.formatBytes(folderElement.size)}
                />
                <SectionField
                    label="Tipo de archivo:"
                    value={folderElement.content_type}
                />
                <SectionField
                    label="Fecha de subida:"
                    value={DateUtil.formatDateTime(folderElement.created_at)}
                />
                <SectionField label="Subido por:" value={folderElement.creation_user} />
            </SectionCard>
        )
    );
};

export default DocumentSection;
