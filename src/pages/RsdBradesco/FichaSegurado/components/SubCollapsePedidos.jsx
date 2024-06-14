import { Box, Chip, Collapse, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { deepPurple, red } from "@mui/material/colors";
import { useState } from "react";
import { colorStatusRsdBradesco } from "../utils/types";
import moment from "moment";

const SubCollapsePedidos = ({ pedido, openSubRow }) => {

    const [pedidos, setPedidos] = useState(pedido)

    return (
        <>
            <Collapse in={openSubRow} timeout="auto" unmountOnExit>
                <Table size="small" >
                    <TableHead sx={{ background: `linear-gradient(45deg, ${red[700]} 80%, ${deepPurple[700]} 95%)` }}>
                        <TableRow>
                            <TableCell align="center" sx={{ color: 'white' }} >Sinistro</TableCell>
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

                        ))
                    }
                </Table>
                <Box
                    p={2}
                >
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            sm={2}
                        >
                            <Typography>
                                Valor Solicitado
                            </Typography>
                            <TextField
                                fullWidth
                                value={pedido?.valorSolicitado}
                                size="small"
                                disabled
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Collapse >
        </>
    )
}

export default SubCollapsePedidos