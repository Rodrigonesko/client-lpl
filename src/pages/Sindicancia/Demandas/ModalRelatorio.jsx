import { Box, Button, CircularProgress, Dialog, TextField } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useState } from "react"
import { FaFileExcel } from "react-icons/fa"
import { getRelatorio } from "../../../_services/sindicancia.service"
import moment from "moment"

const ModalRelatorio = () => {

    const [open, setOpen] = useState(false)
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const result = await getRelatorio({ dataInicio, dataFim })
        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Código</th>"
        xls += "<th>Cliente</th>"
        xls += "<th>Serviço</th>"
        xls += "<th>QTD Beneficiarios</th>"
        xls += "<th>QTD Prestadores</th>"
        xls += "<th>Data Inicio</th>"
        xls += "<th>Data Finalização Sistema</th>"
        xls += "<th>Data Finalização</th>"
        xls += "<th>Justificativa</th>"
        xls += "<th>Valor</th>"
        xls += "<th>Período</th>"
        xls += "<th>Status</th>"
        xls += "<th>Analista Demandante</th>"
        xls += "<th>Analista Responsável</th>"
        xls += "<th>Analista Executor</th>"
        result[0].irregularidadesObj.forEach((item) => {
            xls += "<th>" + item.nome + "</th>"
        })
        xls += "</tr></thead>"
        xls += "<tbody>"

        result.forEach((item) => {
            xls += "<tr>"
            xls += `<td>${item.codigo || ''}</td>`
            xls += `<td>${item.area_empresa_nome || ''}</td>`
            xls += `<td>${item.tipo_servico_nome || ''}</td>`
            xls += `<td>${item.num_beneficiarios || ''}</td>`
            xls += `<td>${item.num_prestadores || ''}</td>`
            xls += `<td>${moment(item.data_demanda).format('DD/MM/YYYY') || ''}</td>`
            xls += `<td>${item.data_finalizacao_sistema ? moment(item.data_finalizacao_sistema).format('DD/MM/YYYY') : ''}</td>`
            xls += `<td>${item.data_finalizacao ? moment(item.data_finalizacao).format('DD/MM/YYYY') : ''}</td>`
            xls += `<td>${item.justificativa_finalizacao || ''}</td>`
            xls += `<td>${item.valor || ''}</td>`
            xls += `<td>${item.periodo || ''}</td>`
            xls += `<td>${item.status_nome || ''}</td>`
            xls += `<td>${item.usuario_criador_nome || ''}</td>`
            xls += `<td>${item.usuario_distribuicao_nome || ''}</td>`
            xls += `<td>${item.usuario_executor_nome || ''}</td>`
            item.irregularidadesObj.forEach((irregularidade) => {
                xls += `<td>${irregularidade.value || ''}</td>`
            })
            xls += "</tr>"
        })

        xls += "</tbody>"
        xls += "</table>"

        const blob = new Blob([xls], { type: 'application/vnd.ms-excel' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'relatorio demandas.xls'
        link.click()

        setLoading(false)
    }

    return (
        <>
            <Button
                endIcon={<FaFileExcel />}
                variant="contained"
                sx={{
                    backgroundColor: '#1C1C1C',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#000',
                        color: '#fff'
                    }
                }}
                onClick={handleClickOpen}
            >
                Relatorio
            </Button >

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        padding: '20px'
                    }}
                >
                    <Box style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            label="Data Inicio"
                            type="date"
                            id="dataInicio"
                            name="dataInicio"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            size="small"
                        />
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            label="Data Fim"
                            type="date"
                            id="dataFim"
                            name="dataFim"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            size="small"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '20px',
                            gap: '10px'
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleClose}
                            sx={{
                                backgroundColor: grey[500],
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: grey[700],
                                    color: '#fff'
                                }
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                backgroundColor: '#1C1C1C',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#000',
                                    color: '#fff'
                                }
                            }}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {
                                loading ? <CircularProgress size={'20px'} /> : 'Gerar Relatório'
                            }
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default ModalRelatorio