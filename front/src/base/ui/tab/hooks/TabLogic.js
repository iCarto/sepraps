import {useState} from "react";

const useTabLogic = (initialTab = 0) => {
    const [tabIndex, setTabIndex] = useState(initialTab);

    const handleChangeTab = (event, newTab) => {
        setTabIndex(newTab);
    };

    return {tabIndex, handleChangeTab};
};

export default useTabLogic;
