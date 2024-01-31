import {useEffect, useState} from "react";

import {TransferList} from ".";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

const SelectAllTransferList = ({
    availableItems,
    preSelectedItems,
    listItemComponent,
    noItemsMessage,
    isListLoading = false,
    onChangeLeftItems,
    onChangeRightItems,
}) => {
    const [checkedItems, setCheckedItems] = useState([]);
    const [leftItems, setLeftItems] = useState([]);
    const [rightItems, setRightItems] = useState([]);
    const [leftChecked, setLeftChecked] = useState([]);
    const [rightChecked, setRightChecked] = useState([]);

    useEffect(() => {
        setLeftItems(availableItems);
        setRightItems(preSelectedItems);
    }, [availableItems, preSelectedItems]);

    useEffect(() => {
        setLeftChecked(intersection(checkedItems, leftItems));
        setRightChecked(intersection(checkedItems, rightItems));
    }, [checkedItems, leftItems, rightItems]);

    const getNumberOfChecked = items => intersection(checkedItems, items).length;

    const handleToggle = item => () => {
        const currentIndex = checkedItems.indexOf(item);
        const newCheckedItems = [...checkedItems];

        if (currentIndex === -1) {
            newCheckedItems.push(item);
        } else {
            newCheckedItems.splice(currentIndex, 1);
        }

        setCheckedItems(newCheckedItems);
    };

    const handleToggleAll = items => () => {
        if (getNumberOfChecked(items) === items.length) {
            setCheckedItems(not(checkedItems, items));
        } else {
            setCheckedItems(union(checkedItems, items));
        }
    };

    const handleCheckedRight = () => {
        setRightItems(rightItems.concat(leftChecked));
        setLeftItems(not(leftItems, leftChecked));
        setCheckedItems(not(checkedItems, leftChecked));

        onChangeLeftItems(not(leftItems, leftChecked));
        onChangeRightItems(rightItems.concat(leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeftItems(leftItems.concat(rightChecked));
        setRightItems(not(rightItems, rightChecked));
        setCheckedItems(not(checkedItems, rightChecked));

        onChangeLeftItems(leftItems.concat(rightChecked));
        onChangeRightItems(not(rightItems, rightChecked));
    };

    return (
        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item xs={5.5}>
                <TransferList
                    title={"Opciones disponibles"}
                    items={leftItems}
                    checkedItems={checkedItems}
                    isLoading={isListLoading}
                    noItemsMessage={noItemsMessage}
                    handleToggle={handleToggle}
                    handleToggleAll={handleToggleAll}
                    getNumberOfChecked={getNumberOfChecked}
                    ListItemComponent={listItemComponent}
                />
            </Grid>
            <Grid item xs={1}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{my: 0.5}}
                        variant="contained"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="mover elementos seleccionados a la derecha"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{my: 0.5}}
                        variant="contained"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="mover elementos seleccionados a la izquierda"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={5.5}>
                <TransferList
                    title={"Opciones añadidas"}
                    items={rightItems}
                    checkedItems={checkedItems}
                    noItemsMessage="No hay proyectos seleccionados."
                    handleToggle={handleToggle}
                    handleToggleAll={handleToggleAll}
                    getNumberOfChecked={getNumberOfChecked}
                    ListItemComponent={listItemComponent}
                />
            </Grid>
        </Grid>
    );
};

export default SelectAllTransferList;
