import { Box, Chip, Collapse, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { deepPurple, indigo, red } from "@mui/material/colors";
import { useState } from "react";
import { colorStatusRsdBradesco } from "../utils/types";
import moment from "moment";

const SubCollapsePedidos = ({ pedido, openSubRow }) => {

    console.log(pedido);

    const [pedidos, setPedidos] = useState(pedido)

    return (
        <>
            <Table size="small" >
                <TableHead sx={{ background: `linear-gradient(45deg, ${red[700]} 80%, ${deepPurple[700]} 95%)` }}>
                    <TableRow>
                        <TableCell align="center" sx={{ color: 'white' }}>Sinistro</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }} >Data Solicitação</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }} >Tipo Documento</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }} >Conselho Profissional de Saúde</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }} >Especialidade</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }} >Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                {
                    pedidos.map((pedido, index) => (
                        <Collapse in={openSubRow} timeout="auto" unmountOnExit>
                            <TableBody>
                                <TableRow key={index._id}>
                                    <TableCell align="center" >{pedido.sinistro}</TableCell>
                                    <TableCell align="center" >{moment(pedido.dataSolicitacao).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell align="center" >{pedido.tipoDocumento}</TableCell>
                                    <TableCell align="center" >{pedido.conselhoProfissionalSaude}</TableCell>
                                    <TableCell align="center" >{pedido.especialidade}</TableCell>
                                    <TableCell
                                        align="center"
                                    >
                                        <Chip
                                            label={pedido.status}
                                            sx={{
                                                color: 'white',
                                                backgroundColor: colorStatusRsdBradesco[pedido.status],
                                            }}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody >

                        </Collapse >
                    ))}
            </Table>
        </>
    )
}

export default SubCollapsePedidos