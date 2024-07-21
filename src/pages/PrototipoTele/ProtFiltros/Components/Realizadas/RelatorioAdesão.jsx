import { useState } from "react"
import { blue } from "@mui/material/colors"
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField } from "@mui/material"
import moment from "moment"
import { DadosEntrevistaService } from "../../../../../_services/teleEntrevistaV2.service"
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const dadosEntrevistaService = new DadosEntrevistaService()

const RelatorioAdesao = () => {
    const [open, setOpen] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleGenerate = async () => {
        try {
            if (startDate === '' && endDate === '') {
                return
            }
            setLoading(true)
            const result = await dadosEntrevistaService.findByFilter({
                dataInicio: startDate,
                dataFim: endDate,
                tipoContrato: 'ADESÃO',
                limit: 100000,
                page: 1
            })

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Relatorio Adesão');

            const columns = [
                { header: 'Id', key: '_id', width: 10 },
                { header: 'anexo', key: 'anexadoSisAmil', width: 10 },
                { header: 'implantado', key: 'implantacao', width: 10 },
                { header: 'implantacao', key: 'implantado', width: 10 },
                { header: 'Ano Ref', key: 'ano', width: 10 },
                { header: 'Mês Ref', key: 'mes', width: 10 },
                { header: 'Data Conclusão', key: 'dataEntrevista', width: 10 },
                { header: 'Porte', key: 'tipoContrato', width: 10 },
                { header: 'Proposta', key: 'proposta', width: 10 },
                { header: 'Nome', key: 'nome', width: 10 },
                { header: 'CPF', key: 'cpf', width: 10 },
                { header: 'Data Nascimento', key: 'dataNascimento', width: 10 },
                { header: 'UF', key: 'filial', width: 10 },
                { header: 'Administradora', key: 'administradora', width: 10 },
                { header: 'Responsável', key: 'responsavel', width: 10 },
                { header: 'Status Final', key: 'cancelado', width: 10 },
                { header: 'Divergência DS', key: 'houveDivergencia', width: 10 },
                { header: 'Tentativas de Contato', key: 'tentativasDeContato', width: 10 },
                { header: 'Tentativa 1', key: 'tentativa1', width: 10 },
                { header: 'Tentativa 2', key: 'tentativa2', width: 10 },
                { header: 'Tentativa 3', key: 'tentativa3', width: 10 },
                { header: 'TEA', key: 'tea', width: 10 },
                { header: 'Cids', key: 'cidsAjustados', width: 10 },
                { header: 'Cids Adesão', key: 'cidsDs', width: 10 },
            ]

            worksheet.columns = columns

            result.entrevistas.forEach(e => {
                const cidsAjustados = e.cidsAjustados.reduce((acc, cid) => {
                    return acc + `${cid.codigo} (${cid.descricao}) : ${cid.ano}, `
                }, '')
                const cidsDs = e?.cidsDs?.reduce((acc, cid) => {
                    return acc + `${cid.codigo} (${cid.descricao}) : ${cid.ano}, `
                }, '')
                worksheet.addRow({
                    _id: e._id,
                    anexadoSisAmil: e.anexadoSisAmil,
                    implantacao: e.implantacao,
                    implantado: e.implantado,
                    ano: moment(e.dataEntrevista).format('YYYY'),
                    mes: moment(e.dataEntrevista).format('MM'),
                    dataEntrevista: new Date(e.dataEntrevista),
                    tipoContrato: e.tipoContrato,
                    proposta: e.proposta,
                    nome: e.nome,
                    cpf: e.cpf,
                    dataNascimento: e.dataNascimento,
                    filial: e.filial,
                    administradora: e.administradora,
                    responsavel: e.responsavel,
                    cancelado: e.cancelado ? 'INCIDÊNCIA' : 'ENTREVISTA DISPONIBILIZADA',
                    houveDivergencia: e.houveDivergencia,
                    tentativasDeContato: e?.idProposta?.tentativasDeContato.length,
                    tentativa1: e?.idProposta?.tentativasDeContato[0]?.data,
                    tentativa2: e?.idProposta?.tentativasDeContato[1]?.data,
                    tentativa3: e?.idProposta?.tentativasDeContato[2]?.data,
                    tea: e.tea,
                    cidsAjustados,
                    cidsDs,
                })
            })
            const buffer = await workbook.xlsx.writeBuffer()
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            saveAs(blob, 'Relatorio Propostas.xlsx')
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    bgcolor: blue[100],
                    color: blue[800],
                    '&:hover': {
                        bgcolor: blue[500],
                        opacity: 0.8,
                    },
                }}
                onClick={handleClickOpen}
            >
                Relatorio Adesão
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Relatorio Adesão
                </DialogTitle>
                <DialogContent>
                    <Box component={Paper} p={1}>
                        <Box display='flex' flexDirection='column'>
                            <TextField
                                onChange={event => setStartDate(event.target.value)}
                                value={startDate}
                                type="date"
                                label='Data Inicio'
                                focused
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                onChange={event => setEndDate(event.target.value)}
                                value={endDate}
                                type="date"
                                label='Data FIm'
                                focused
                                sx={{ mt: 2 }}
                            />
                        </Box>
                        <Box mt={2} textAlign='center'>
                            <Button
                                disabled={loading}
                                startIcon={loading && <CircularProgress />}
                                onClick={handleGenerate}
                                variant="contained"
                                sx={{
                                    bgcolor: blue[100],
                                    color: blue[800],
                                    '&:hover': {
                                        bgcolor: blue[500],
                                        opacity: 0.8,
                                    },

                                }}
                            >Gerar Relatorio</Button>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color='inherit' onClick={handleClose}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RelatorioAdesao