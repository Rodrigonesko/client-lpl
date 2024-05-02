import { Add } from "@mui/icons-material"
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { useState } from "react"
import Toast from "../../../../components/Toast/Toast";

const AdicionarSubPergunta = ({ setSubperguntas }) => {

    const [subPergunta, setSubPergunta] = useState('')
    const [condicao, setCondicao] = useState('')
    const [autismo, setAutismo] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleAdicionarSubPergunta = () => {
        if (subPergunta === '' || condicao === '') {
            setOpenToast(true)
            setMessage('Preencha todos os campos')
            setSeverity('error')
            return
        }

        setSubperguntas((prev) => {
            return [
                ...prev,
                {
                    texto: subPergunta,
                    condicao,
                    autismo
                }
            ]
        })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'column',
                m: 2
            }}
        >
            <TextField
                fullWidth
                label="Sub Pergunta"
                placeholder="Texto da Sub Pergunta"
                size="small"
                variant="outlined"
                value={subPergunta}
                onChange={(e) => setSubPergunta(e.target.value)}
            />
            <FormControl>
                <FormLabel>Condição</FormLabel>
                <RadioGroup
                    value={condicao}
                    onChange={(e) => setCondicao(e.target.value)}
                    row
                >
                    <FormControlLabel control={<Radio />} label="Sim" value={"Sim"} />
                    <FormControlLabel control={<Radio />} label="Não" value={"Não"} />
                </RadioGroup>
            </FormControl>
            <Button
                variant="contained"
                fullWidth
                endIcon={<Add />}
                onClick={handleAdicionarSubPergunta}
            >
                Adicionar Sub Pergunta
            </Button>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={message}
                severity={severity}
            />
        </Box>
    )
}

export default AdicionarSubPergunta;