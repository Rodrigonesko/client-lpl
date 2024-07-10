import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, FormLabel, TextField, Box } from '@mui/material'
import Toast from '../../../components/Toast/Toast'
import { BiSpreadsheet } from 'react-icons/bi'
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { filterUrgenciasEmergencias } from '../../../_services/urgenciaEmergenciaNew.service';

const ModalRelatorio = () => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [openToast, setOpenToast] = useState(false)
    const [tipoRelatorio, setTipoRelatorio] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')

    const gerarRelatorio = async () => {
        setLoading(true)
        try {
            const query = {}
            if (tipoRelatorio === 'Data Inclusão') {
                query.dataInicioInclusao = dataInicio
                query.dataFimInclusao = dataFim
            } else {
                query.dataInicioConclusao = dataInicio
                query.dataFimConclusao = dataFim
            }
            const result = await filterUrgenciasEmergencias(query)

            console.log(result);

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Urgências e Emergências');

            worksheet.columns = [
                { header: 'MÊS', key: 'mes', width: 10 },
                { header: 'DATA', key: 'data', width: 10 },
                { header: 'NUM_ASSOCIADO', key: 'numAssociado', width: 10 },
                { header: 'NOME_ASSOCIADO', key: 'nomeAssociado', width: 10 },
                { header: 'DATA_NASCIMENTO', key: 'dataNascimento', width: 10 },
                { header: 'IDADE', key: 'idade', width: 10 },
                { header: 'DATA_ADESAO', key: 'dataAdesao', width: 10 },
                { header: 'NUM_TELEFONE', key: 'numTelefone', width: 10 },
                { header: 'EMAIL', key: 'email', width: 10 },
                { header: 'COD_PRC', key: 'codPrc', width: 10 },
                { header: 'NUM_PEDIDO', key: 'numPedido', width: 10 },
                { header: 'NOME_PRESTADOR_AUTORIZ', key: 'nomePrestadorAutoriz', width: 10 },
                { header: 'INF RELATORIO MÉDICO', key: 'infRelatorioMedico', width: 10 },
                { header: 'CPT IMPUTADA (SIM/NÃO)', key: 'cptImputada', width: 10 },
                { header: '1º CTTO', key: 'primeiroContato', width: 10 },
                { header: '2º CTTO', key: 'segundoContato', width: 10 },
                { header: '3º CTTO', key: 'terceiroContato', width: 10 },
                { header: 'OBSERVAÇÕES DO CONTATO', key: 'observacoesContato', width: 10 },
                { header: 'Data Recebimento', key: 'dataRecebimento', width: 10 },
                { header: 'Data Conclusão', key: 'dataConclusao', width: 10 },
                { header: 'Status', key: 'status', width: 10 },
                { header: 'Analista', key: 'analista', width: 10 },
            ];

            result.urgencias.forEach((item) => {
                worksheet.addRow({
                    mes: item.mes,
                    data: new Date(item.data),
                    numAssociado: item.numAssociado,
                    nomeAssociado: item.nomeAssociado,
                    dataNascimento: new Date(item.dataNascimento),
                    idade: item.idade,
                    dataAdesao: new Date(item.dataAdesao),
                    numTelefone: item.telefone,
                    email: item.email,
                    codPrc: item.prc,
                    numPedido: item.pedido,
                    nomePrestadorAutoriz: item.nomePrestador,
                    infRelatorioMedico: item.relatorioMedico,
                    cptImputada: item.retorno,
                    primeiroContato: item.contato1 && new Date(item.contato1),
                    segundoContato: item.contato2 && new Date(item.contato2),
                    terceiroContato: item.contato3 && new Date(item.contato3),
                    observacoesContato: item.observacoes,
                    dataRecebimento: new Date(item.dataRecebimento),
                    dataConclusao: new Date(item.dataConclusao),
                    status: item.status,
                    analista: item.analista,
                });
            })

            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), 'UrgenciasEmergencias.xlsx');

            setMessage('Relatório gerado com sucesso!')
            setSeverity('success')
        } catch (error) {
            console.log(error);
            setMessage('Erro ao gerar relatório!')
            setSeverity('error')
        } finally {
            setLoading(false)
            setOpen(false)
            setOpenToast(true)
        }
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant="contained"
                color="primary"
                sx={{
                    borderRadius: '10px',
                }}
                endIcon={<BiSpreadsheet />}
            >
                Gerar Relatório
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Gerando Relatório</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <FormLabel>Tipo de Relatório</FormLabel>
                        <RadioGroup
                            value={tipoRelatorio}
                            onChange={(e) => setTipoRelatorio(e.target.value)}
                        >
                            <FormControlLabel value="Data Inclusão" control={<Radio />} label="Data Inclusão" />
                            <FormControlLabel value="Data Conclusão" control={<Radio />} label="Data Conclusão" />
                        </RadioGroup>
                    </FormControl>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexDirection: 'column',
                            marginTop: 2
                        }}
                    >
                        <TextField
                            label="Data Início"
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={loading}
                        />
                        <TextField
                            label="Data Fim"
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={loading}
                        />
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='inherit' onClick={() => setOpen(false)}>Fechar</Button>
                    <Button
                        onClick={gerarRelatorio}
                        disabled={loading}
                        endIcon={loading && <CircularProgress size={20} />}
                        variant='contained'
                    >
                        Gerar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={message}
                severity={severity}
            />
        </>
    )
}

export default ModalRelatorio