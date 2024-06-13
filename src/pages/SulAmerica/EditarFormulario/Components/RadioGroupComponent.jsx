import { FormControlLabel, Radio, RadioGroup } from "@mui/material"

const RadioGroupComponent = ({ handleChange, pergunta, resposta }) => {
    return (
        <RadioGroup
            row
            onChange={handleChange}
            name={pergunta}
            value={resposta}
        >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
            <FormControlLabel value="Não se aplica" control={<Radio />} label="Não se aplica" />
        </RadioGroup>
    )
}

export default RadioGroupComponent