import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slide } from "@mui/material";

const FiltroEnfermeiros = ({
    analistas,
    responsavel,
    handleSelectAnalista,
    loading,
    openSlide
}) => {
    return (
        <Slide
            direction={'right'}
            in={openSlide}
            mountOnEnter
            unmountOnExit
        >
            <Box
                display={'flex'}
                flexDirection={'column'}
                width={'300px'}
            >
                <FormControl>
                    <FormLabel>Analistas</FormLabel>
                    <RadioGroup
                        value={responsavel}
                        onChange={handleSelectAnalista}
                    >
                        <FormControlLabel
                            key={-1}
                            value={'Todos'}
                            control={<Radio />}
                            label={'Todos'}
                        />
                        {analistas.map((analista, index) => (
                            <FormControlLabel
                                key={index}
                                value={analista.name}
                                control={<Radio />}
                                label={analista.name}
                                disabled={loading}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
        </Slide>

    )
}

export default FiltroEnfermeiros;