import { FormControlLabel, Radio, RadioGroup } from "@mui/material"

const RadioGroupComponent = ({ handleChange, pergunta }) => {
    return (
        <RadioGroup
            row
            onChange={handleChange}
            name={pergunta}
        >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
        </RadioGroup>
    )
}

export default RadioGroupComponent