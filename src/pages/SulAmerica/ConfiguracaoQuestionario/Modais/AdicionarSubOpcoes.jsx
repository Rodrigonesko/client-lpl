import { Add } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import Toast from "../../../../components/Toast/Toast";

const AdicionarSubOpcoes = ({ setOpcoes }) => {

    const [opcao, setOpcao] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleAdicionarOpcao = () => {
        if (opcao === '') {
            setOpenToast(true)
            setMessage('Preencha todos os campos')
            setSeverity('error')
            return
        }

        setOpcoes((prev) => {
            if (prev.includes(opcao)) {
                setOpenToast(true)
                setMessage('Opção já adicionada')
                setSeverity('error')
                return prev
            }
            return [...prev, opcao.trim()]
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
                label="Opção"
                placeholder="Texto da Opção"
                size="small"
                variant="outlined"
                value={opcao}
                onChange={(e) => setOpcao(e.target.value)}
            />
            <Button
                variant="contained"
                color='success'
                fullWidth
                endIcon={<Add />}
                onClick={handleAdicionarOpcao}
            >
                Adicionar Opção
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

export default AdicionarSubOpcoes;