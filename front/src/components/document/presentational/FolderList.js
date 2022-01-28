import {FolderDetailItem, DocumentDetailItem} from ".";
import Grid from "@mui/material/Grid";

const FolderList = ({folderElements, selectedElement, onSelectElement, basePath}) => {
    return folderElements.map(folderElement => {
        if (folderElement.children) {
            return (
                <Grid item xs={3} key={folderElement.name}>
                    <FolderDetailItem
                        folder={folderElement}
                        basePath={basePath}
                        selected={selectedElement?.name === folderElement.name}
                        onSelect={onSelectElement}
                    />
                </Grid>
            );
        } else {
            return (
                <Grid item xs={3} key={folderElement.name}>
                    <DocumentDetailItem
                        document={folderElement}
                        basePath={basePath}
                        selected={selectedElement?.name === folderElement.name}
                        onSelect={onSelectElement}
                    />
                </Grid>
            );
        }
    });
};

export default FolderList;
