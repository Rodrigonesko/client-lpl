import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Paper, FormControl, InputLabel, Select, CircularProgress, MenuItem } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { getPropostasEntreDatas } from "../../../../../_services/teleEntrevista.service";
import { calcularDiasUteis } from "../../../../../functions/functions";
import { blue } from "@mui/material/colors";

const feriados = [
    moment('2022-01-01'),
    moment('2022-04-21'),
    moment('2022-05-01'),
    moment('2022-09-07'),
    moment('2022-10-12'),
    moment('2022-11-02'),
    moment('2022-11-15'),
    moment('2022-12-25'),
    moment('2023-01-01'),
    moment('2023-02-20'),
    moment('2023-02-21'),
    moment('2023-02-22'),
    moment('2023-04-07'),
    moment('2023-04-21'),
    moment('2023-05-01'),
    moment('2023-06-08'),
    moment('2023-09-07'),
    moment('2023-10-12'),
    moment('2023-11-02'),
    moment('2023-11-15'),
    moment('2023-12-25'),
    moment('2024-01-01'),
    moment('2024-02-12'),
    moment('2024-02-13'),
    moment('2024-03-29'),
    moment('2024-04-21'),
    moment('2024-05-01'),
    moment('2024-05-30'),
    moment('2024-09-07'),
    moment('2024-10-12'),
    moment('2024-11-02'),
    moment('2024-11-15'),
    moment('2024-11-20'),
    moment('2024-12-25'),
];

const RelatorioPropostas = () => {

    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [tipoRelatorio, setTipoRelatorio] = useState('Data Conclusão')

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleGenerate = async () => {

        if (startDate === '' && endDate === '') {
            return
        }

        setLoading(true)

        const result = await getPropostasEntreDatas(startDate, endDate, tipoRelatorio)

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Data Recebimento</th>"
        xls += "<th>Data Vigencia</th>"
        xls += "<th>Vigencia Amil</th>"
        xls += "<th>Proposta</th>"
        xls += "<th>Tipo Associado</th>"
        xls += "<th>Nome</th>"
        xls += "<th>Cpf</th>"
        xls += "<th>Data Nascimento</th>"
        xls += "<th>Administrador</th>"
        xls += "<th>Risco</th>"
        xls += "<th>Sinistralidade</th>"
        xls += "<th>Houve Divergencia</th>"
        xls += "<th>Cid Irregularidade</th>"
        xls += "<th>Cid Identificado</th>"
        xls += "<th>Data Entrevista</th>"
        xls += "<th>Idade</th>"
        xls += "<th>Sexo</th>"
        xls += "<th>Telefone</th>"
        xls += "<th>Status</th>"
        xls += "<th>Data Conclusão</th>"
        xls += "<th>Tipo Contrato</th>"
        xls += "<th>1° Contato</th>"
        xls += "<th>Responsavel 1° Contato</th>"
        xls += "<th>2° Contato</th>"
        xls += "<th>Responsavel 2° Contato</th>"
        xls += "<th>3° Contato</th>"
        xls += "<th>Responsavel 3° Contato</th>"
        xls += "<th>Total de tentativas</th>"
        xls += "<th>Dias uteis</th>"
        xls += "<th>Ret</th>"
        xls += "<th>Nome Operadora</th>"
        xls += "<th>Filial</th>"
        xls += "<th>Responsavel</th>"
        xls += "</tr>"
        xls += "</thead>"
        xls += "<tbody>"

        result.forEach(e => {

            xls += "<tr>"
            xls += `<td>${moment(e.dataRecebimento).format('DD/MM/YYYY')}</td>`
            xls += `<td>${moment(e.vigencia).format('DD/MM/YYYY')}</td>`
            xls += `<td>${moment(e.vigenciaAmil).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.proposta || ''}</td>`
            xls += `<td>${e.tipoAssociado || ''}</td>`
            xls += `<td>${e.nome || ''}</td>`
            xls += `<td>${e.cpf || ''}</td>`
            xls += `<td>${e.dataNascimento || ''}</td>`
            xls += `<td>${e.administradora || ''}</td>`
            xls += `<td>${e.riscoImc || ''}</td>`
            xls += `<td>${e.sinistral || ''}</td>`
            xls += `<td>${e.houveDivergencia || ''}</td>`
            xls += `<td>${e.cid || ''}</td>`
            xls += `<td>${e.cids || ''}</td>`
            xls += `<td>${e.dataEntrevista || ''}</td>`
            xls += `<td>${e.idade || ''}</td>`
            xls += `<td>${e.sexo || ''}</td>`
            xls += `<td>${e.telefone || ''}</td>`
            xls += `<td>${e.status || ''}</td>`
            xls += `<td>${e.dataConclusao ? moment(e.dataConclusao).format('DD/MM/YYYY') : ''}</td>`
            xls += `<td>${e.tipoContrato || ''}</td>`
            xls += `<td>${e?.tentativasDeContato[0]?.data || ''}</td>`
            xls += `<td>${e?.tentativasDeContato[0]?.responsavel || ''}</td>`
            xls += `<td>${e?.tentativasDeContato[1]?.data || ''}</td>`
            xls += `<td>${e?.tentativasDeContato[1]?.responsavel || ''}</td>`
            xls += `<td>${e?.tentativasDeContato[2]?.data || ''}</td>`
            xls += `<td>${e?.tentativasDeContato[2]?.responsavel || ''}</td>`
            xls += `<td>${e?.tentativasDeContato?.length}</td>`

            let diasUteis = calcularDiasUteis(moment(e.dataRecebimento), moment(e.dataConclusao), feriados)
            if (!e.dataConclusao) {
                diasUteis = ''
            }
            xls += `<td>${diasUteis}</td>`
            xls += `<td>${e.retrocedido || ''}</td>`
            xls += `<td>${e.nomeOperadora || ''}</td>`
            xls += `<td>${e.filail || ''}</td>`
            xls += `<td>${e.enfermeiro || ''}</td>`


            xls += `</tr>`
        })

        xls += "</tbody></table>"

        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = 'Relatório Propostas.xls'
        a.click()

        setLoading(false)
    }

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                    backgroundColor: blue[600],
                    color: 'white',
                    '&:hover': {
                        backgroundColor: blue[600],
                        opacity: 0.8
                    },
                    ml: 1,
                }}
            >
                Relatorio Propostas
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Relatório de Propostas Recebidas"}
                </DialogTitle>
                <DialogContent>
                    <Box component={Paper} p={1}>
                        <FormControl fullWidth size="small" >
                            <InputLabel id="demo-simple-select-label">Tipo Relatorio</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Tipo Relatorio"
                                value={tipoRelatorio}
                                onChange={(e) => {
                                    setTipoRelatorio(e.target.value)
                                }}
                            >
                                <MenuItem value={'Data Recebido'}>Data Recebido</MenuItem>
                                <MenuItem value={'Data Conclusão'}>Data Conclusão</MenuItem>
                            </Select>
                        </FormControl>
                        <Box display='flex' flexDirection='column'>
                            <TextField
                                onChange={event => setStartDate(event.target.value)}
                                value={startDate}
                                type="date"
                                label='Data Inicio'
                                focused
                                sx={{ mt: 2 }}

                            />
                            <TextField onChange={event => setEndDate(event.target.value)} value={endDate} type="date" label='Data Fim' focused sx={{ mt: 2 }} />
                        </Box>
                        <Box mt={2} textAlign='center'>
                            <Button disabled={loading} startIcon={loading && <CircularProgress />} onClick={handleGenerate} variant="contained">Gerar Relatorio</Button>
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

export default RelatorioPropostas;