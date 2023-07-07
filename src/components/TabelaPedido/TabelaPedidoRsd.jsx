import { TableRow, TableCell, Collapse, Box, Table, TableHead, TableBody, TextField, Button, Checkbox } from "@mui/material"

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
                                                <TableRow>
                                                    <TableCell><TextField value={pedido.numero} inputProps={{
                                                        style: { fontSize: '14px', padding: '4px', width: '80px' }
                                                    }} /></TableCell>
                                                    <TableCell>{pedido.status}</TableCell>
                                                    <TableCell><TextField size="small" value={pedido.valorApresentado} /></TableCell>
                                                    <TableCell>{pedido.valorReembolsado}</TableCell>
                                                    <TableCell><TextField size="small" value={pedido.cnpj} /></TableCell>
                                                    <TableCell><TextField size="small" value={pedido.clinica} /></TableCell>
                                                    <TableCell><TextField size="small" value={pedido.nf} /></TableCell>
                                                    <TableCell><Button color="success" size="small" >Salvar</Button></TableCell>
                                                    <TableCell><Button color='inherit' size="small" >Inativar</Button></TableCell>
                                                    <TableCell>{pedido.fila}</TableCell>
                                                    <TableCell><Checkbox></Checkbox></TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

export default TabelaPedidoRsd