import {useState} from "react";
import {useFormContext} from "react-hook-form";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

const FormStepper = ({onSubmit, onCancel = null, steps = [], stepComponents = []}) => {
    const {handleSubmit, trigger} = useFormContext();
    const [activeStep, setActiveStep] = useState(0);

    const moreThanOneStep = steps.length > 1;

    function getStepContent(step) {
        if (stepComponents[step]) {
            return stepComponents[step];
        }
        return null;
    }

    const handleNext = async () => {
        const isStepValid = await trigger();
        if (isStepValid) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep === 0) {
            onCancel();
        } else {
            setActiveStep(prevActiveStep => prevActiveStep - 1);
        }
    };

    return (
        <Box>
            {moreThanOneStep ? (
                <Stepper activeStep={activeStep}>
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            ) : null}
            <Container sx={{p: moreThanOneStep ? 3 : 0}}>
                {getStepContent(activeStep)}
            </Container>
            <Box sx={{display: "flex", flexDirection: "row", pt: 2}}>
                <Button color="primary" onClick={handleBack}>
                    {activeStep === 0 ? "Cancelar" : "Atrás"}
                </Button>
                <Box sx={{flex: "1 1 auto"}} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    Guardar
                </Button>
                {activeStep !== steps.length - 1 && (
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ml: 2}}
                        onClick={handleNext}
                    >
                        Siguiente
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default FormStepper;
