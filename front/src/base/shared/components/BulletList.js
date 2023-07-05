import {SectionActionsMenu} from "base/ui/section/components";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleIcon from "@mui/icons-material/Circle";

const BulletList = ({items, getActions = null}) => {
    const listItemStyle = {
        pt: 0,
        px: 1,
        "& .MuiListItemText-root": {
            maxWidth: "90%",
        },
    };

    return (
        <List dense>
            {items
                ? items.map((item, index) => {
                      return (
                          <ListItem
                              key={index}
                              sx={listItemStyle}
                              secondaryAction={
                                  getActions ? (
                                      <SectionActionsMenu>
                                          {getActions(index)}
                                      </SectionActionsMenu>
                                  ) : null
                              }
                          >
                              <ListItemIcon sx={{minWidth: "36px"}}>
                                  <CircleIcon sx={{fontSize: "8px"}} />
                              </ListItemIcon>
                              <ListItemText primary={item} />
                          </ListItem>
                      );
                  })
                : null}
        </List>
    );
};

export default BulletList;
