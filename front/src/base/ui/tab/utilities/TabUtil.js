const TabUtil = {
    a11yProps(index) {
        return {
            id: `tab-${index}`,
            "aria-controls": `tabpanel-${index}`,
        };
    },
};

export default TabUtil;
