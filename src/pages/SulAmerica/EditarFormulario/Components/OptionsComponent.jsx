import { FormControl, MenuItem, Select } from "@mui/material"

const OptionsComponent = ({ options, handleChange, pergunta, resposta }) => {
    return (
        <FormControl
            sx={{
                minWidth: '300px'
            }}
        >
            <Select
                fullWidth
                variant="outlined"
                size="small"
                onChange={handleChange}
                name={pergunta}
                value={resposta}
            >
                {
                    options.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))
                }
                <MenuItem value="Outro">Outro</MenuItem>
            </Select>
        </FormControl>
    )
}

export default OptionsComponent