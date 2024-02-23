import { Box, Button, TextField } from "@mui/material"
import moment from "moment"
import Toast from "../../../components/Toast/Toast"
import { finalizarDemanda } from "../../../_services/sindicancia.service"
import { useState } from "react"

const FinalizacaoDemanda = ({ demanda }) => {

    const dataInicio = moment(demanda.data_demanda)
    const dataFim = moment(demanda.data_finalizacao || new Date())
    const diff = dataFim.diff(dataInicio, 'days')
    let data = demanda

    const [justificativa, setJustificativa] = useState(demanda.justificativa_finalizacao || '')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const handleFinalizar = async () => {
        setLoading(true)
        if (diff > 3 && !justificativa) {
            setToast(true)
            setMessage('Justificativa é obrigatória')
            setSeverity('warning')
            setLoading(false)
            return
        }
        const result = await finalizarDemanda({
            id_demanda: demanda.id,
            justificativa
        })
        if (!result.error) {
            setToast(true)
            setMessage('Demanda finalizada com sucesso')
            setSeverity('success')
            data.data_finalizacao = new Date()
            data.justificativa_finalizacao = justificativa
        } else {
            setToast(true)
            setMessage('Erro ao finalizar demanda')
            setSeverity('error')
        }
        setLoading(false)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                m: 2
            }}
        >
            {
                !demanda.data_finalizacao && (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexDirection: 'column'
                        }}
                    >
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleFinalizar}
                        >
                            Finalizar
                        </Button>
                        {
                            diff > 3 && (
                                <TextField
                                    label="Justificativa"
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    rows={2}
                                    color="error"
                                    value={justificativa}
                                    onChange={(e) => setJustificativa(e.target.value)}
                                />
                            )
                        }
                    </Box>
                )
            }
            {
                data.data_finalizacao && (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexDirection: 'column'
                        }}
                    >
                        <TextField
                            label="Data Inicio"
                            variant="outlined"
                            size="small"
                            value={moment(data.data_demanda).format('DD/MM/YYYY')}
                            disabled
                        />
                        <TextField
                            label="Data Fim"
                            variant="outlined"
                            size="small"
                            value={moment(data.data_finalizacao).format('DD/MM/YYYY')}
                            disabled
                        />
                        <TextField
                            label="Dias"
                            variant="outlined"
                            size="small"
                            value={diff}
                            disabled
                        />
                        <TextField
                            label="Justificativa"
                            variant="outlined"
                            size="small"
                            multiline
                            rows={2}
                            value={data.justificativa_finalizacao}
                            disabled
                        />
                    </Box>
                )

            }
            <Toast
                open={toast}
                onClose={() => setToast(false)}
                message={message}
                severity={severity}
            />

        </Box>
    )
}

export default FinalizacaoDemanda