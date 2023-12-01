import {ListTableFolder} from "base/file/components";
import {SectionCard} from "base/ui/section/components";

const ViewOrUpdateFilesDataContent = ({folderPath}) => {
    return (
        <SectionCard title="Archivos adjuntos">
            <ListTableFolder folderPath={folderPath} basePath={""} />
        </SectionCard>
    );
};

export default ViewOrUpdateFilesDataContent;
