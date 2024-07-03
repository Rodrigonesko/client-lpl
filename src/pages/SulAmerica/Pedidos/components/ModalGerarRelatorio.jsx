import { blue } from "@mui/material/colors";
import ModalComponent from "../../../../components/ModalComponent/ModalComponent";
import { Download } from "@mui/icons-material";
import { getPedidosByDate, getQuestionarioByName } from "../../../../_services/sulAmerica.service";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import moment from "moment";

const ModalGerarRelatorio = () => {

    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')

    return (
        <ModalComponent
            isButton={true}
            buttonColorScheme={blue[900]}
            headerText={'Relatório de Pedidos'}
            textButton={'Gerar Relatório'}
            buttonText={'Gerar Relatório'}
            size={'lg'}
            saveButtonColorScheme={blue[900]}
            buttonIcon={<Download />}
            onAction={async () => {
                const response = await getPedidosByDate(dataInicio ? dataInicio : '2024-05-01', dataFim ? dataFim : moment().format('YYYY-MM-DD'));
                const formulario = await getQuestionarioByName('Sindicância Script TEA');

                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Pedidos');

                response.forEach((pedido) => {
                    if (pedido.subStatus === 'REALIZADO') {
                        pedido.resposta.respostas = pedido.resposta.respostas.map((resposta) => {
                            const subRespostas = resposta.subPerguntas
                                .filter((subPergunta) => subPergunta.resposta)
                                .map((subPergunta) => ` - ${subPergunta.texto}: ${subPergunta.resposta}`)
                                .join('');
                            resposta.resposta += subRespostas;
                            return resposta;
                        });
                    }
                });

                worksheet.columns = [
                    { header: 'Beneficiario', key: 'beneficiario', width: 15 },
                    { header: 'Responsável', key: 'responsavel', width: 15 },
                    { header: 'Valor Pago', key: 'valorPago', width: 15 },
                    { header: 'Prestador', key: 'prestador', width: 15 },
                    { header: 'Data Conclusão', key: 'dataConclusao', width: 15 },
                    { header: 'Status', key: 'status', width: 10 },
                    { header: 'Sub Status', key: 'subStatus', width: 10 },
                    { header: 'pdf baixado', key: 'pdfBaixado', width: 10 },
                    { header: 'Quem baixou', key: 'quemBaixou', width: 10 },
                    { header: 'ligacaoBaixada', key: 'ligacaoBaixada', width: 10 },
                    { header: 'Quem baixou Ligacao', key: 'quemBaixouLigacao', width: 10 },
                    { header: 'Justificativa', key: 'justificativa', width: 15 },
                    { header: 'Divergência', key: 'divergencia', width: 10 },
                    { header: 'Responsável', key: 'responsavel', width: 15 },
                    { header: 'Tentativa 1', key: 'tentativa1', width: 15 },
                    { header: 'Tentativa 2', key: 'tentativa2', width: 15 },
                    { header: 'Tentativa 3+', key: 'tentativa3', width: 15 },
                    ...formulario.perguntas.map((pergunta) => {
                        return {
                            header: pergunta.pergunta.pergunta,
                            key: pergunta.pergunta.pergunta,
                            width: 15
                        }
                    })
                ];

                response.forEach(pedido => {
                    worksheet.addRow({
                        beneficiario: pedido.beneficiario.nome || '',
                        responsavel: pedido.beneficiario?.responsavelLegal || '',
                        valorPago: pedido.valorPago || 0,
                        prestador: pedido.prestador.nome || '',
                        dataConclusao: pedido.dataConclusao ? new Date(pedido.dataConclusao) : '',
                        status: pedido.status || '',
                        subStatus: pedido.subStatus || '',
                        pdfBaixado: pedido.statusSulAmerica,
                        quemBaixou: pedido.logs?.find(log => log.acao === 'PDF baixado')?.responsavel,
                        ligacaoBaixada: pedido.statusLigacao,
                        quemBaixouLigacao: pedido.logs?.find(log => log.acao === 'Ligação baixada')?.responsavel,
                        justificativa: pedido.justificativaCancelamento || '',
                        divergencia: pedido.divergencia ? 'Sim' : '',
                        responsavel: pedido.responsavel || '',
                        tentativa1: pedido.tentativasDeContato?.length >= 1 ? new Date(pedido.tentativasDeContato[0].data) : '',
                        tentativa2: pedido.tentativasDeContato?.length >= 2 ? new Date(pedido.tentativasDeContato[1].data) : '',
                        tentativa3: pedido.tentativasDeContato?.length >= 3 ? new Date(pedido.tentativasDeContato[2].data) : '',
                        ...pedido.resposta?.respostas.reduce((acc, resposta) => {
                            acc[resposta.pergunta] = resposta.resposta
                            return acc
                        }, {})
                    });
                });

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
                });

                workbook.xlsx.writeBuffer().then((buffer) => {
                    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    saveAs(blob, 'Pedidos.xlsx');
                });
            }}
        >
            <Box
                display='flex'
                gap={2}
                flexDirection={'column'}
            >
                <Box>
                    <Typography>Data Início</Typography>
                    <TextField type='date' fullWidth size="small" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
                </Box>
                <Box>
                    <Typography>Data Fim</Typography>
                    <TextField type='date' fullWidth size="small" value={dataFim} onChange={e => setDataFim(e.target.value)} />
                </Box>
            </Box>
        </ModalComponent>
    )
}

export default ModalGerarRelatorio;