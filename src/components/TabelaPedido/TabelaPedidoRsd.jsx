import { TableRow, TableCell, Collapse, Box, Table, TableHead, TableBody, Button } from "@mui/material"
import RowPedidoRsd from "./RowPedidoRsd";

const TabelaPedidoRsd = (props) => {

    const { open, protocolo, pedidos, pacote, flushHook, check, checkPedidos, setCheckPedidos, finalizados } = props

    console.log(open, protocolo, pedidos, pacote, flushHook, check, checkPedidos, setCheckPedidos, finalizados);

    return (
        <TableRow size="small" >
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8} >
                <Collapse in={open} timeout='auto' unmountOnExit >
                    <Box sx={{ margin: 1 }}>
                        <Table >
                            <TableHead className="table-header">
                                <TableRow>
                                    <TableCell align='center'>Pedido</TableCell>
                                    <TableCell align='center'>Status</TableCell>
                                    <TableCell align='center'>R$ Apresentado</TableCell>
                                    <TableCell align='center'>R$ Reembolsado</TableCell>
                                    <TableCell align='center'>CNPJ</TableCell>
                                    <TableCell align='center'>Clínica</TableCell>
                                    <TableCell align='center'>NF</TableCell>
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
                                            console.log('aaa');
                                            if (finalizados && pedido.status === 'Finalizado') {
                                                return (
                                                    <RowPedidoRsd
                                                        flushHook={flushHook}
                                                        pedido={pedido}
                                                        check={check}
                                                        checkPedidos={checkPedidos}
                                                        setCheckPedidos={setCheckPedidos}
                                                    />
                                                )
                                            }
                                            if (!finalizados && pedido.status !== 'Finalizado') {
                                                return (
                                                    <RowPedidoRsd
                                                        flushHook={flushHook}
                                                        pedido={pedido}
                                                        check={check}
                                                        checkPedidos={checkPedidos}
                                                        setCheckPedidos={setCheckPedidos}
                                                    />
                                                )
                                            }
                                        }
                                    })
                                }
                            </TableBody>
                            <Box mt={1} ml={1}>
                                <Button size="small" href={`/rsd/CriarPedido/${protocolo}`} target='_blank' variant="contained">Novo Pedido</Button>
                            </Box>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

export default TabelaPedidoRsd