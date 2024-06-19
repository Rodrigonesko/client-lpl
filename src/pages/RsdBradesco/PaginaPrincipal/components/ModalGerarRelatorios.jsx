import { useState } from "react"
import { Print } from "@mui/icons-material"
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Menu, CircularProgress } from "@mui/material"
import Toast from "../../../../components/Toast/Toast"
import { getRelatorioPedidos } from "../../../../_services/rsdBradesco.service"
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import moment from "moment"

// export class SpreadsheetPedidoDto {
//     'Numero Sinistro (Completo)': string;
//     'Mês Ano Solicitação Reembolso': string;
//     'Data Solicitação': number;
//     'Tipo Documento Reembolso': string;
//     'Número Nota Fiscal Eletrônica': string;
//     'Código Verificação Nota Fiscal Eletrônica': string;
//     'Nome Cidade/Estado da Nota Fiscal (Descritivo)': string;
//     'Estado Nota Fiscal Eletrônica': string;
//     'UF': string;
//     'Conselho Profisional Saúde': string;
//     'classificação CRM': string;
//     'tipo': string;
//     'Especialidade Médica': string;
//     'Tipo Evento': string;
//     'Data Evento Sinistro': number;
//     'Empresa': number;
//     'nome empresa': string;
//     'Ramo': string;
//     'Apólice': string;
//     'nome da Apólice': string;
//     'data início apólice': string;
//     'Prestador (CPF/CNPJ)': string;
//     'Prestador Serviço': string;
//     'UF - Prestador Serviço': string;
//     'CPF Segurado': string;
//     'Telefone Segurado': string;
//     'Celular Segurado': string;
//     'Email Segurado': string;
//     'Segurado': string;
//     'nome segurado': string;
//     'Segurado Titular': string;
//     'nome segurado titular': string;
//     'Situação Série Sinistro': string;
//     'Vlr. Solicitado do Documento na Série': string;
//     'Vlr. Liberado Pagamento Documento': string;
// }

const ModalGerarRelatorios = () => {

    const statusList = [
        'A INICIAR',
        'EM ANDAMENTO',
        'FINALIZADO'
    ]

    const [open, setOpen] = useState(false)
    const [tipoRelatorio, setTipoRelatorio] = useState('DATA DE CRIAÇÃO')
    const [dataInicial, setDataInicial] = useState('')
    const [dataFinal, setDataFinal] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const handleGerarRelatorio = async () => {
        try {
            setLoading(true)
            const response = await getRelatorioPedidos(dataInicial, dataFinal, tipoRelatorio, status)
            console.log(response)
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Sinistros');

            worksheet.columns = [
                { header: 'Numero Sinistro (Completo)', key: 'sinistro', width: 20 },
                { header: 'Mês Ano Solicitação Reembolso', key: 'mesAno', width: 20 },
                { header: 'Data Solicitação', key: 'dataSolicitacao', width: 20 },
                { header: 'Tipo Documento Reembolso', key: 'tipoDocumento', width: 20 },
                { header: 'Número Nota Fiscal Eletrônica', key: 'numeroNotaFiscal', width: 20 },
                { header: 'Código Verificação Nota Fiscal Eletrônica', key: 'codigoVerificacao', width: 20 },
                { header: 'Nome Cidade/Estado da Nota Fiscal (Descritivo)', key: 'nomeCidadeEstado', width: 20 },
                { header: 'Estado Nota Fiscal Eletrônica', key: 'estadoNotaFiscal', width: 20 },
                { header: 'UF', key: 'uf', width: 20 },
                { header: 'Conselho Profisional Saúde', key: 'conselhoProfissional', width: 20 },
                { header: 'classificação CRM', key: 'classificacaoCRM', width: 20 },
                { header: 'tipo', key: 'tipo', width: 20 },
                { header: 'Especialidade Médica', key: 'especialidade', width: 20 },
                { header: 'Tipo Evento', key: 'tipoEvento', width: 20 },
                { header: 'Data Evento Sinistro', key: 'dataEvento', width: 20 },
                { header: 'Empresa', key: 'empresa', width: 20 },
                { header: 'nome empresa', key: 'nomeEmpresa', width: 20 },
                { header: 'Ramo', key: 'ramo', width: 20 },
                { header: 'Apólice', key: 'apolice', width: 20 },
                { header: 'nome da Apólice', key: 'nomeApolice', width: 20 },
                { header: 'data início apólice', key: 'dataInicioApolice', width: 20 },
                { header: 'Estipulante', key: 'estipulante', width: 20 },
                { header: 'Prestador (CPF/CNPJ)', key: 'prestador', width: 20 },
                { header: 'Prestador Serviço', key: 'prestadorServico', width: 20 },
                { header: 'UF - Prestador Serviço', key: 'ufPrestador', width: 20 },
                { header: 'CPF Segurado', key: 'cpfSegurado', width: 20 },
                { header: 'Telefone Segurado', key: 'telefoneSegurado', width: 20 },
                { header: 'Celular Segurado', key: 'celularSegurado', width: 20 },
                { header: 'Email Segurado', key: 'emailSegurado', width: 20 },
                { header: 'Segurado', key: 'segurado', width: 20 },
                { header: 'nome segurado', key: 'nomeSegurado', width: 20 },
                { header: 'Segurado Titular', key: 'seguradoTitular', width: 20 },
                { header: 'nome segurado titular', key: 'nomeSeguradoTitular', width: 20 },
                { header: 'Situação Série Sinistro', key: 'situacaoSerie', width: 20 },
                { header: 'Vlr. Solicitado do Documento na Série', key: 'valorSolicitado', width: 20 },
                { header: 'Vlr. Liberado Pagamento Documento', key: 'valorLiberado', width: 20 },
                { header: 'comprovante de pagamento', key: 'comprovantePagamento', width: 20 },
                { header: 'tipo de comprovante', key: 'tipoComprovante', width: 20 },
                { header: 'data envio LPL', key: 'dataCriacao', width: 20 },
                { header: 'parecer LPL', key: 'parecer', width: 20 },
                { header: 'data retorno LPL', key: 'dataRetorno', width: 20 },
            ]

            console.log(response);

            response.forEach(pedido => {
                worksheet.addRow({
                    sinistro: pedido.sinistro,
                    mesAno: moment(pedido.dataSolicitacao).format('MM/YYYY'),
                    dataSolicitacao: new Date(pedido.dataSolicitacao),
                    tipoDocumento: pedido.tipoDocumento,
                    numeroNotaFiscal: pedido?.nf?.numero,
                    codigoVerificacao: pedido?.nf?.codigo,
                    nomeCidadeEstado: pedido?.nf?.cidade,
                    estadoNotaFiscal: pedido?.nf?.estado,
                    uf: pedido?.nf?.uf,
                    conselhoProfissional: pedido.conselhoProfissionalSaude,
                    classificacaoCRM: pedido.crm,
                    tipo: pedido.tipo,
                    especialidade: pedido.especialidade,
                    tipoEvento: pedido.evento?.tipo,
                    dataEvento: new Date(pedido.evento?.data),
                    empresa: pedido.empresa?.numero,
                    nomeEmpresa: pedido.empresa?.nome,
                    ramo: pedido.ramo,
                    apolice: pedido?.apolice?.numero,
                    nomeApolice: pedido?.apolice?.nome,
                    dataInicioApolice: new Date(pedido?.apolice?.dataInicio),
                    estipulante: pedido.estipulante,
                    prestador: pedido?.prestador?.nome,
                    prestadorServico: pedido?.prestador?.servico,
                    ufPrestador: pedido.prestador?.uf,
                    cpfSegurado: pedido.segurado?.cpf,
                    telefoneSegurado: pedido.seguradp?.telefone,
                    celularSegurado: pedido.segurado?.celular,
                    emailSegurado: pedido.segurado?.email,
                    segurado: pedido.segurado?.codigo,
                    nomeSegurado: pedido.segurado?.nome,
                    seguradoTitular: pedido.segurado?.titular.codigo,
                    nomeSeguradoTitular: pedido.segurado?.titular.nome,
                    situacaoSerie: pedido.situacao,
                    valorSolicitado: pedido.valorSolicitado,
                    valorLiberado: pedido.valorLiberado,
                    comprovantePagamento: pedido.comprovantePagamento ? 'SIM' : 'NÃO',
                    tipoComprovante: pedido.tipoComprovante,
                    dataCriacao: new Date(pedido.dataCriacao),
                    parecer: pedido.parecer,
                    dataRetorno: pedido.dataRetorno,
                })
            });

            worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    if (rowNumber === 1) {
                        cell.font = {
                            bold: true,
                        };
                    }
                });
            });

            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'relatorio_sinistros.xlsx');
            setMessage('Relatório gerado com sucesso')
            setSeverity('success')
            setOpenToast(true)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setMessage('Erro ao gerar relatório')
            setSeverity('error')
            setOpenToast(true)
            setLoading(false)
        }
    }

    return (
        <>
            <Button
                variant='contained'
                color='primary'
                sx={{ mt: 2 }}
                endIcon={<Print />}
                onClick={() => setOpen(true)}
            >
                Relatórios
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    Gerar Relatórios
                </DialogTitle>
                <DialogContent>
                    <FormControl>
                        <FormLabel>Tipo formulário</FormLabel>
                        <RadioGroup
                            value={tipoRelatorio}
                            onChange={(e) => setTipoRelatorio(e.target.value)}
                        >
                            <FormControlLabel value='DATA DE CRIAÇÃO' control={<Radio />} label='Data de Criação' />
                            <FormControlLabel value='DATA DE RETORNO' control={<Radio />} label='Data de Retorno' />
                        </RadioGroup>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel>Status</FormLabel>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value=''>Selecione</MenuItem>
                            {
                                statusList.map((status, index) => (
                                    <MenuItem key={index} value={status}>{status}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        type='date'
                        label='Data Inicial'
                        fullWidth
                        sx={{ mt: 2 }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={dataInicial}
                        onChange={(e) => setDataInicial(e.target.value)}
                    />
                    <TextField
                        type='date'
                        label='Data Final'
                        fullWidth
                        sx={{ mt: 2 }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={dataFinal}
                        onChange={(e) => setDataFinal(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleGerarRelatorio}
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
                message={message}
                severity={severity}
            />
        </>
    )
}

export default ModalGerarRelatorios