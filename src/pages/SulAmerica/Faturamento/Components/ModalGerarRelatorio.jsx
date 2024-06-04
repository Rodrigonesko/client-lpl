import moment from "moment"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useState } from "react"
import { findByDate } from "../../../../_services/sulAmerica.service"
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ModalGerarRelatorio = ({ lotes }) => {

    const [open, setOpen] = useState(false)
    const [lote, setLote] = useState('')
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const handleGerarRelatorio = async () => {
        setLoading(true);
        try {
            const response = await findByDate(lote)

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Pedidos');

            worksheet.columns = [
                { header: 'Lote', key: 'lote', width: 15 },
                { header: 'Beneficiario', key: 'beneficiario', width: 15 },
                { header: 'Pedido', key: 'pedido', width: 15 },
                { header: 'Status', key: 'status', width: 15 },
                { header: 'Sub Status', key: 'subStatus', width: 15 },
                { header: 'Responsavel', key: 'responsavel', width: 10 },
                { header: 'NF', key: 'nf', width: 10 },
            ];

            response.forEach(pedido => {
                worksheet.addRow({
                    lote: moment(pedido.pedido.dataCriacao).format('DD/MM/YYYY') || '',
                    beneficiario: pedido.pedido.beneficiario?.nome || '',
                    pedido: pedido.pedido._id || '',
                    status: pedido.pedido.status || '',
                    subStatus: pedido.pedido.subStatus || '',
                    responsavel: pedido.pedido.responsavel || '',
                    nf: pedido.nf || '',
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

            return workbook.xlsx.writeBuffer().then((buffer) => {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                saveAs(blob, 'Pedidos.xlsx');
            });
            
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <>
            <Button onClick={() => { setOpen(true) }} variant='contained' >Gerar Relatório</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Gerar Relatório</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ width: "300px", mt: 2 }} size="small">
                        <InputLabel>Lote</InputLabel>
                        <Select label="Lote"
                            value={lote}
                            onChange={(e) => setLote(e.target.value)}
                        >
                            <MenuItem value={""}>Todos</MenuItem>
                            {lotes.map((lote) => (
                                <MenuItem key={lote} value={lote}>
                                    {moment(lote).format("DD/MM/YYYY")}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Fechar</Button>
                    <Button color='success' onClick={handleGerarRelatorio} >Gerar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalGerarRelatorio