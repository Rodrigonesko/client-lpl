import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { createComplementacao } from "../../../_services/sindicancia.service"
import Toast from "../../../components/Toast/Toast"

const Complementacao = ({ data, setData }) => {

    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('info')
    const [message, setMessage] = useState('Salvando...')
    const [hook, setHook] = useState(false)

    useEffect(() => {
        const handleComplementacao = async () => {
            setLoading(true)
            console.log(data);
            await createComplementacao({
                id_demanda: data.id,
                data: data.data_complementacao,
                ...data
            })
            setSeverity('success')
            setMessage('Salvo com sucesso!')
            setOpenToast(true)
            setLoading(false)
        }
        handleComplementacao()
    }, [hook])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                m: 2
            }}
        >
            <FormControlLabel
                label="Complementação"
                control={
                    <Checkbox
                        checked={data.complementacao}
                        onChange={e => {
                            setData({ ...data, complementacao: e.target.checked })
                            setHook(!hook)
                        }}
                        disabled={loading}
                    />
                }
            />
            {
                data.complementacao &&
                <>
                    <TextField
                        placeholder="Data"
                        variant="outlined"
                        type="date"
                        size="small"
                        value={data.data_complementacao}
                        onChange={e => setData({ ...data, data_complementacao: e.target.value })}
                        disabled={loading}
                    />
                    <TextField
                        placeholder="Motivo"
                        variant="outlined"
                        multiline
                        rows={2}
                        size="small"
                        value={data.motivo}
                        onChange={e => setData({ ...data, motivo: e.target.value })}
                        disabled={loading}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setHook(!hook)}
                        size="small"
                        disabled={loading}
                    >
                        Salvar
                    </Button>
                </>
            }
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                severity={severity}
                message={message}
            />
        </Box>
    )
}

export default Complementacao