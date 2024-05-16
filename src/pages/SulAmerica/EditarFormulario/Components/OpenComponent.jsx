import { TextField } from "@mui/material"

const OpenComponent = ({handleChange, pergunta, resposta}) => {
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
            value={resposta}
        />
    )
}

export default OpenComponent