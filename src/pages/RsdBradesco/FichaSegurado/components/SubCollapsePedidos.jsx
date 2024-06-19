import { Box, Chip, Collapse, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { deepPurple, grey, red } from "@mui/material/colors";
import { useState } from "react";
import { colorParecer, colorStatusPedido } from "../../utils/types";
import moment from "moment";
import { valueToBRL } from "../../../../functions/functions";
import ModalCriarPedido from "./ModalCriarPedido";

const Info = ({ label, value }) => (
    <Grid item
        xs={12}
        sm={2}
    >
        <Typography
            variant='subtitle2'
            sx={{
                color: grey[700],
                fontWeight: 'bold'
            }}
        >
            {label}
        </Typography>
        <Typography
            variant='body2'
            sx={{
                color: grey[900],
                fontWeight: 'bold'
            }}
        >
            {value}
        </Typography>
    </Grid>
)

const SubCollapsePedidos = ({ pacote, openSubRow, segurados }) => {

    const [pedidos, setPedidos] = useState(pacote.pedidos)

    return (
        <Collapse in={openSubRow} timeout="auto" unmountOnExit mountOnEnter>
            <Table size="small" >
                <TableHead sx={{ background: `linear-gradient(45deg, ${red[700]} 80%, ${deepPurple[700]} 95%)` }}>
                    <TableRow>
                        <TableCell align="left" sx={{ color: 'white' }} >Sinistro</TableCell>
                        <TableCell align="left" sx={{ color: 'white' }} >Data Solicitação</TableCell>
                        <TableCell align="left" sx={{ color: 'white' }} >Tipo Documento</TableCell>
                        <TableCell align="left" sx={{ color: 'white' }} >Conselho Profissional de Saúde</TableCell>
                        <TableCell align="left" sx={{ color: 'white' }} >Especialidade</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }} >Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                {
                    pedidos.map((pedido) => (
                        <TableBody key={pedido._id}>
                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }} >{pedido.sinistro}</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }} >{moment(pedido.dataSolicitacao).format('DD/MM/YYYY')}</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }} >{pedido.tipoDocumento}</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }} >{pedido.conselhoProfissionalSaude}</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }} >{pedido.especialidade}</TableCell>
                                <TableCell
                                    align="center"
                                >
                                    <Box
                                        display={'flex'}
                                        alignItems={'center'}
                                        sx={{ gap: 1 }}
                                        flexDirection={'column'}
                                    >
                                        <Chip
                                            label={pedido.status}
                                            sx={{
                                                backgroundColor: colorStatusPedido[pedido.status],
                                                fontWeight: 'bold'
                                            }}
                                            size="small"
                                        />
                                        {pedido.parecer && <Chip
                                            label={pedido.parecer}
                                            sx={{
                                                backgroundColor: colorParecer[pedido.parecer],
                                                fontWeight: 'bold'
                                            }}
                                            size="small"
                                        />}
                                    </Box>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Grid container spacing={2} mt={1}>
                                        <Info label={'Tipo Documento'} value={pedido?.tipoDocumento} />
                                        <Info label={'Especialidade'} value={pedido?.especialidade} />
                                        <Info label={'Valor Solicitado'} value={valueToBRL(pedido.valorSolicitado)} />
                                        <Info label={'Maior Data Execução'} value={moment(pedido.dataCriacao).format('DD/MM/YYYY')} />
                                        <Info label={'Tipo Evento'} value={pedido?.evento?.tipo} />
                                        <Info label={'Data Evento'} value={moment(pedido?.evento?.data).format('DD/MM/YYYY')} />
                                        <Info label={'CPF/CNPJ do Prestador'} value={pedido?.prestador.cpfCnpj} />
                                        <Info label={'Nome do Prestador'} value={pedido?.prestador.nome} />
                                        <Info label={'UF Prestador'} value={pedido?.prestador?.uf} />
                                        <Info label={'N° NF'} value={pedido?.nf?.numero} />
                                        <Info label={'Codigo NF'} value={pedido?.nf?.cofigo} />
                                        <Info label={'Cidade NF'} value={pedido?.nf?.cidade} />
                                        <Info label={'Estado NF'} value={pedido?.nf?.estado} />
                                        <Info label={'Uf NF'} value={pedido?.nf?.uf} />
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        </TableBody >
                    ))
                }
                <Box
                    m={1}
                >
                    <ModalCriarPedido segurados={segurados} pacote={pacote} setPedidos={setPedidos} />
                </Box>
            </Table>
        </Collapse >
    )
}

export default SubCollapsePedidos