import {SectionCard, SectionField} from "components/common/presentational";
import {DateUtil, FileUtil} from "utilities";

const DocumentSection = ({folderElement}) => {
    return (
        <SectionCard title={folderElement?.name}>
            <SectionField
                label="Tamaño del archivo:"
                value={FileUtil.formatBytes(folderElement?.size)}
            />
            <SectionField
                label="Tipo de archivo:"
                value={folderElement?.content_type}
            />
            <SectionField
                label="Fecha de subida:"
                value={DateUtil.formatDateTime(folderElement?.created_at)}
            />
            <SectionField label="Subido por:" value={folderElement?.creation_user} />
        </SectionCard>
    );
};

export default DocumentSection;
