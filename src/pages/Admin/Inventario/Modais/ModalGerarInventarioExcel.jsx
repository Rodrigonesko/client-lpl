import { FaFileExcel } from "react-icons/fa";
import ModalComponent from "../../../../components/ModalComponent/ModalComponent";
import { blue } from "@mui/material/colors";
import { findAllInventario } from "../../../../_services/inventario.service";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ModalGerarInventarioExcel = () => {

    return (
        <ModalComponent
            isButton={true}
            buttonColorScheme={blue[900]}
            headerText={'Relatório do Inventário'}
            textButton={'Gerar Relatório'}
            buttonText={'Gerar Relatório'}
            size={'lg'}
            saveButtonColorScheme={blue[900]}
            buttonIcon={<FaFileExcel />}
            onAction={async () => {
                const response = await findAllInventario();

                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Inventario');

                worksheet.columns = [
                    { header: 'Nome Item', key: 'nome', width: 25 },
                    { header: 'Etiqueta', key: 'etiqueta', width: 15 },
                    { header: 'Com Quem Esta', key: 'ondeEsta', width: 40 },
                    { header: 'Descricao', key: 'descricao', width: 60 },
                    { header: 'Data de Compra', key: 'dataDeCompra', width: 15 },
                    { header: 'Data de Garantia', key: 'dataDeGarantia', width: 15 },
                    { header: 'Status', key: 'status', width: 15 },
                    { header: 'Serial', key: 'serial', width: 15 },
                ];

                response.forEach(inventario => {
                    worksheet.addRow({
                        nome: inventario.nome || '',
                        etiqueta: inventario.etiqueta || '',
                        ondeEsta: inventario.ondeEsta || '',
                        descricao: inventario.descricao || '',
                        dataDeCompra: inventario.dataDeCompra || '',
                        dataDeGarantia: inventario.dataDeGarantia || '',
                        status: inventario.status || '',
                        serial: inventario.serial || '',
                    });
                });

                worksheet.eachRow((row, rowNumber) => {
                    row.eachCell((cell) => {
                        if (rowNumber === 1) {
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: '0099ff' },
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
                    saveAs(blob, 'Inventario.xlsx');
                });
            }}
        >

        </ModalComponent>
    )
}

export default ModalGerarInventarioExcel