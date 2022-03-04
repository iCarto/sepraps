import {SectionCard, SectionField} from "components/common/presentational";
import {FileUtil} from "utilities";

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
            <SectionField label="Fecha de subida:" value="01/01/01" />
            <SectionField label="Subido por:" value="Usuaria" />
        </SectionCard>
    );
};

export default DocumentSection;
