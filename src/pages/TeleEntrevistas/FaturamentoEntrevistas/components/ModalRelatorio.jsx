import { useState } from "react"
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import Toast from "../../../../components/Toast/Toast"
import moment from 'moment'
import { DadosEntrevistaService } from "../../../../_services/teleEntrevistaV2.service"
import { RnService } from "../../../../_services/rn.service"
import { filterUrgenciasEmergencias } from "../../../../_services/urgenciaEmergenciaNew.service"
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

const dadosEntrevistaService = new DadosEntrevistaService()
const rnService = new RnService()

const ModalRelatorio = () => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')

    const gerarRelatorio = async () => {
        setLoading(true)
        try {
            const [result, resultUe, reusltRn] = await Promise.all([
                dadosEntrevistaService.findByFilter({
                    dataInicio,
                    dataFim,
                    page: 1,
                    limit: 20000
                }),
                filterUrgenciasEmergencias({
                    status: 'Concluído',
                    dataInicioConclusao: dataInicio,
                    dataFimConclusao: dataFim,
                    page: 1,
                    limit: 20000
                }),
                rnService.findByFilter({
                    dataInicio,
                    dataFim,
                    page: 1,
                    limit: 20000
                })
            ])

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Pedidos');

            worksheet.columns = [
                { header: 'Id', key: 'id', width: 15 },
                { header: 'Analista', key: 'analista', width: 15 },
                { header: 'Tipo', key: 'tipo', width: 15 },
                { header: 'Proposta', key: 'proposta', width: 15 },
                { header: 'Nome', key: 'nome', width: 15 },
                { header: 'Data Entrevista', key: 'dataEntrevista', width: 15 },
                { header: 'Faturado', key: 'faturado', width: 15 },
                { header: 'Nota Fiscal', key: 'nf', width: 15 },
                { header: 'Data Faturamento', key: 'dataFaturamento', width: 15 },
            ];

            result.entrevistas.forEach(e => {
                worksheet.addRow({
                    id: e._id || '',
                    analista: e.cancelado ? e.divergencia : e.responsavel || '',
                    tipo: 'Tele' || '',
                    proposta: e.proposta || '',
                    nome: e.nome || '',
                    dataEntrevista: moment(e.dataEntrevista).format('DD/MM/YYYY') || '',
                    faturado: e.faturado || '',
                    nf: e.nf || '',
                    dataFaturamento: e.dataFaturamento ? moment(e.dataFaturamento).format('DD/MM/YYYY') : '' || '',
                });

            })

            reusltRn.pedidos.forEach(e => {
                worksheet.addRow({
                    id: e._id || '',
                    analista: e.responsavel || '',
                    tipo: 'Rn' || '',
                    proposta: e.proposta || '',
                    nome: e.beneficiario || '',
                    dataEntrevista: moment(e.dataConclusao).format('DD/MM/YYYY') || '',
                    faturado: e.faturado || '',
                    nf: e.nf || '',
                    dataFaturamento: e.dataFaturamento ? moment(e.dataFaturamento).format('DD/MM/YYYY') : '' || '',
                });
            })

            resultUe.urgencias.forEach(e => {
                worksheet.addRow({
                    id: e._id || '',
                    analista: e.retorno === 'Sem sucesso de contato' ? 'Sem Sucesso de Contato!' : e.analista || '',
                    tipo: 'UE' || '',
                    proposta: e.pedido || '',
                    nome: e.nomeAssociado || '',
                    dataEntrevista: moment(e.dataConclusao).format('DD/MM/YYYY') || '',
                    faturado: e.faturado || '',
                    nf: e.nf || '',
                    dataFaturamento: e.dataFaturamento ? moment(e.dataFaturamento).format('DD/MM/YYYY') : '' || '',
                });
            })

            worksheet.eachRow((row, rowNumber) => {
                row.eachCell((cell) => {
                    if (rowNumber === 1) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FF6100' },
                        };
                        cell.font = {
                            bold: true,
                            color: { argb: 'FFFFFF' },
                        }
                        cell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                        }
                    }
                });
            })

            workbook.xlsx.writeBuffer().then((buffer) => {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `faturamento-tel-${moment().format('DD-MM-YYYY')}.xlsx`);
            });
            
            setLoading(false)
        } catch (error) {
            console.log(error);
            setSeverity('error')
            setMessage('Erro ao gerar relatório')
            setOpenToast(true)
            setLoading(false)
        }
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            >
                Relatório
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Relatório</DialogTitle>
                <DialogContent>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        p={2}
                    >
                        <TextField
                            label="Data Início"
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true
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
                                shrink: true
                            }}
                            disabled={loading}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                        color="inherit"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={gerarRelatorio}
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        endIcon={loading && <CircularProgress size={20} />}
                    >
                        Gerar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                severity={severity}
                message={message}
            />
        </>
    )
}

export default ModalRelatorio