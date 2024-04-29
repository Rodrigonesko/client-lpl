import { Container, Stepper, Step, StepLabel, Button, Typography, Box } from '@mui/material'
import Sidebar from '../../../components/Sidebar/Sidebar'
import { useState } from 'react'
import Beneficiario from './Beneficiario'
import InfoPlano from './InfoPlano'
import Proposta from './Proposta'
import { blue } from '@mui/material/colors'

const steps = [
    'Beneficiário',
    'Informações do Plano',
    'Proposta',
]

const AdicionarProposta = () => {

    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set())

    const isStepSkipped = (step) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    return (
        <Sidebar>
            <Container
                sx={{
                    mt: 3,
                }}
            >
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {}
                        const labelProps = {}
                        if (isStepSkipped(index)) {
                            stepProps.completed = false
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                {
                    activeStep === steps.length ? (
                        <Box>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    ) : (
                        <Box>
                            {activeStep === 0 && <Beneficiario />}
                            {activeStep === 1 && <InfoPlano />}
                            {activeStep === 2 && <Proposta />}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mt: 3,
                                }}
                            >
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant='contained'
                                >
                                    Anterior
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    variant='contained'
                                    sx={{
                                        backgroundColor: blue[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: blue[700],
                                        }
                                    }}
                                >
                                    Próximo
                                </Button>
                            </Box>
                        </Box>
                    )
                }
            </Container>
        </Sidebar>
    )
}

export default AdicionarProposta