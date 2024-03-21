const ContractServiceIcon = ({contractService}) => {
    console.log({contractService});
    switch (contractService) {
        case "Ejecución de obra":
            return <span>OB</span>;
        case "Fiscalización de obra":
            return <span>FO</span>;
        case "Fiscalización social":
            return <span>FS</span>;
    }
    return <span>-</span>;
};

export default ContractServiceIcon;
