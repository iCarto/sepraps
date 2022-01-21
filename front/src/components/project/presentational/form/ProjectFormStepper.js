import {useState} from "react";
import {useFormContext} from "react-hook-form";

import ProjectFormGeneralDataSection from "./ProjectFormGeneralDataSection";
import ProjectFormProviderSection from "./ProjectFormProviderSection";
import ProjectFormLocationSection from "./ProjectFormLocationSection";
import ProjectFormFinancingSection from "./ProjectFormFinancingSection";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

function getSteps() {
    return ["Datos generales", "Prestador", "Ubicación", "Financiación"];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <ProjectFormGeneralDataSection />;
        case 1:
            return <ProjectFormProviderSection />;
        case 2:
            return <ProjectFormLocationSection />;
        case 3:
            return <ProjectFormFinancingSection />;
        default:
            return "Unknown step";
    }
}

const ProjectFormStepper = ({onSubmit}) => {
    const {handleSubmit, trigger} = useFormContext();

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = async () => {
        const isStepValid = await trigger();
        if (isStepValid) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const steps = getSteps();

    return (
        <Box>
            <Stepper activeStep={activeStep}>
                {steps.map(label => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Container sx={{p: 3}}>{getStepContent(activeStep)}</Container>
            <Box sx={{display: "flex", flexDirection: "row", pt: 2}}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Atrás
                </Button>
                <Box sx={{flex: "1 1 auto"}} />
                {activeStep === steps.length - 1 ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Guardar
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Siguiente
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ProjectFormStepper;
