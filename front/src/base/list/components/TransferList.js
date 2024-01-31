import {Spinner} from "base/shared/components";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert";

const TransferList = ({
    title,
    items,
    checkedItems,
    handleToggle,
    handleToggleAll,
    getNumberOfChecked,
    ListItemComponent,
    noItemsMessage = "",
    isLoading = false,
}) => {
    return (
        <Card sx={{border: "1px solid #7FBCE1"}}>
            <CardHeader
                sx={{px: 2, py: 1}}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={
                            getNumberOfChecked(items) === items.length &&
                            items.length !== 0
                        }
                        indeterminate={
                            getNumberOfChecked(items) !== items.length &&
                            getNumberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            "aria-label": "all items selected",
                        }}
                    />
                }
                title={title}
                subheader={`${getNumberOfChecked(items)}/${items.length} marcadas`}
            />
            <Divider />
            <List
                sx={{
                    height: 420,
                    bgcolor: "background.paper",
                    overflow: "auto",
                }}
                dense
                component="div"
                role="list"
            >
                {isLoading ? (
                    <Spinner />
                ) : !items.length ? (
                    <Alert severity="info">{noItemsMessage}</Alert>
                ) : (
                    items.map(item => {
                        const labelId = `transfer-list-all-item-${item}-label`;

                        return (
                            <ListItem
                                key={item.id}
                                onClick={handleToggle(item)}
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        onChange={handleToggle(item)}
                                        checked={checkedItems.indexOf(item) !== -1}
                                        inputProps={{"aria-labelledby": labelId}}
                                    />
                                }
                                disablePadding
                            >
                                <ListItemComponent item={item} />
                            </ListItem>
                        );
                    })
                )}
            </List>
        </Card>
    );
};

export default TransferList;
