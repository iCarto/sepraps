import {LayerMenuLegendItem} from ".";

import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";

const LayerMenuDiscriminatorInfo = ({text, legendItems}) => {
    return (
        <List dense={true} className="LayerMenuDiscriminatorInfo">
            <ListSubheader className="LayerMenuDiscriminatorInfoHeader">
                {text}
            </ListSubheader>
            {legendItems.map(legendItem => (
                <LayerMenuLegendItem
                    key={legendItem.text}
                    icon={legendItem.getIcon ? legendItem.getIcon() : legendItem.icon}
                    text={legendItem.text}
                    toggleFn={legendItem.toggleFn}
                />
            ))}
        </List>
    );
};

export default LayerMenuDiscriminatorInfo;
