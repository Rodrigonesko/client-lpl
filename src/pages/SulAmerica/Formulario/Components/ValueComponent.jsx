import { TextField } from "@mui/material"

const ValueComponent = ({ pergunta, handleChange }) => {
    return (
        <TextField
            sx={{
                mt: 1
            }}
            fullWidth
            variant="outlined"
            size="small"
            type="number"
            name={pergunta}
            onChange={handleChange}
            placeholder="R$ 0,00"
        />
    )
}

export default ValueComponent