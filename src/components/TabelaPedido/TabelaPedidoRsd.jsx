import { TableRow, TableCell, Collapse, Box, Table, TableHead, TableBody, Button } from "@mui/material"
import { buscarClinica, devolverPedido, editarPedido, prioridadeDossie, voltarFasePedido } from "../../_services/rsd.service";
import RowPedidoRsd from "./RowPedidoRsd";

const TabelaPedidoRsd = (props) => {

    const { open, protocolo, pedidos, pacote } = props

    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8} >
                <Collapse in={open} timeout='auto' unmountOnExit >
                    <Box sx={{ margin: 1 }}>
                        <Table size="small">
                            <TableHead className="table-header">
                                <TableRow>
                                    <TableCell>Pedido</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>R$ Apresentado</TableCell>
                                    <TableCell>R$ Reembolsado</TableCell>
                                    <TableCell>CNPJ</TableCell>
                                    <TableCell>Clínica</TableCell>
                                    <TableCell>NF</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    pedidos.map(pedido => {
                                        if (protocolo === pedido.protocolo && pedido.pacote === pacote) {
                                            return (
                                                <RowPedidoRsd pedido={pedido} />
                                            )
                                        }
                                    })
                                }
                                <TableRow>
                                    <TableCell>
                                        <Button href={`/rsd/CriarPedido/${protocolo}`} target='_blank' variant="contained">Novo Pedido</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

export default TabelaPedidoRsd