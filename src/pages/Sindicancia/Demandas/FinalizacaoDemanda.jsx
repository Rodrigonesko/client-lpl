import { Box, Button, TextField } from "@mui/material"
import moment from "moment"
import Toast from "../../../components/Toast/Toast"
import { finalizarDemanda } from "../../../_services/sindicancia.service"
import { useState } from "react"
require('moment-business-days')
const FinalizacaoDemanda = ({ demanda }) => {

    const dataInicio = moment(demanda.data_demanda)
    const dataFim = moment(demanda.data_finalizacao || new Date())
    const diff = dataFim.businessDiff(dataInicio)
    let data = demanda
    const [justificativa, setJustificativa] = useState(demanda.justificativa_finalizacao || '')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')
    const [dataFinalizacao, setDataFinalizacao] = useState('')

    const handleFinalizar = async () => {
        setLoading(true)
        if (diff > 3 && !justificativa) {
            setToast(true)
            setMessage('Justificativa é obrigatória')
            setSeverity('error')
            setLoading(false)
            return
        }
        if (!dataFinalizacao) {
            setToast(true)
            setMessage('Data é obrigatória')
            setSeverity('error')
            setLoading(false)
            return
        }
        const result = await finalizarDemanda({
            id_demanda: demanda.id,
            justificativa,
            data: dataFinalizacao
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
                        }}
                    >
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleFinalizar}
                        >
                            Finalizar
                        </Button>
                        <TextField
                            label="Data"
                            variant="outlined"
                            size="small"
                            type="date"
                            value={dataFinalizacao}
                            onChange={(e) => setDataFinalizacao(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Box>
                )
            }
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