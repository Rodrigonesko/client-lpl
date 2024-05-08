import { TextField } from "@mui/material"

const OpenComponent = ({ pergunta, handleChange }) => {
    return (
        <TextField
            sx={{
                mt: 1
            }}
            fullWidth
            variant="outlined"
            size="small"
            name={pergunta}
            onChange={handleChange}
            placeholder="Resposta"
        />
    )
}

export default OpenComponent