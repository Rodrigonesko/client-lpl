import { Box, Chip, Collapse, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { indigo, red } from "@mui/material/colors";
import { useState } from "react";
import { colorStatusRsdBradesco } from "../utils/types";
import moment from "moment";

const SubCollapsePedidos = ({ pedido, openSubRow }) => {

    console.log(pedido);

    const [pedidos, setPedidos] = useState(pedido)

    return (
        <>
            {
                pedidos.map((pedido, index) => (
                    <Collapse in={openSubRow} timeout="auto" unmountOnExit>
                        <Table size="small" >
                            <TableHead sx={{ background: `linear-gradient(45deg, ${indigo[800]} 30%, ${red[700]} 75%)` }}>
                                <TableRow>
                                    <TableCell sx={{ color: 'white' }}>Sinistro</TableCell>
                                    <TableCell sx={{ color: 'white' }} >Data Solicitação</TableCell>
                                    <TableCell sx={{ color: 'white' }} >Tipo Documento</TableCell>
                                    <TableCell sx={{ color: 'white' }} >Conselho Profissional de Saúde</TableCell>
                                    <TableCell sx={{ color: 'white' }} >Especialidade</TableCell>
                                    <TableCell sx={{ color: 'white' }} >Status</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={index._id}>
                                    <TableCell>{pedido.sinistro}</TableCell>
                                    <TableCell>{moment(pedido.dataSolicitacao).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{pedido.tipoDocumento}</TableCell>
                                    <TableCell>{pedido.conselhoProfissionalSaude}</TableCell>
                                    <TableCell>{pedido.especialidade}</TableCell>
                                    <TableCell
                                        align="center"
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <Chip
                                                label={pedido.status}
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor: colorStatusRsdBradesco[pedido.status],
                                                }}
                                                size="small"
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody >
                        </Table>
                    </Collapse>
                ))}
        </>
    )
}

export default SubCollapsePedidos