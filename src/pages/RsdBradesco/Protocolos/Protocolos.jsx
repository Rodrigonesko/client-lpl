import { Box, Chip, Collapse, Container, Divider, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import { deepPurple, indigo, red } from "@mui/material/colors"
import CollapseProtocolos from "../FichaSegurado/components/CollapseProtocolos"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Toast from "../../../components/Toast/Toast"
import { getPacoteById, getPacotesBySegurado, getSeguradoById, getSeguradosByTitular, getTitularById } from "../../../_services/rsdBradesco.service"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { colorStatusRsdBradesco } from "../FichaSegurado/utils/types"
import SubCollapsePedidos from "../FichaSegurado/components/SubCollapsePedidos"
import moment from "moment"
import Ficha from "../components/Ficha"

const Protocolos = () => {

    const { id } = useParams();

    const [pacotes, setPacotes] = useState([]);
    const [segurados, setSegurados] = useState([]);
    const [titular, setTitular] = useState();

    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const [openSubRow, setOpenSubRow] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            try {
                const dataPacotes = await getPacoteById(id);
                setPacotes(dataPacotes);
                const data = await getTitularById(dataPacotes.titular);
                setTitular(data);
                const dataSegurados = await getSeguradosByTitular(dataPacotes.titular);
                setSegurados(dataSegurados);
            } catch (error) {
                console.log(error);
                setMessage('Erro ao buscar dados')
                setSeverity('error')
                setOpenToast(true)
            }
        }
        fetch();
    }, [id])

    console.log(pacotes);

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Title size={'medium'} fontColor={indigo[800]} lineColor={red[700]}>Protocolos</Title>
                    <Divider />
                    <Ficha
                        titular={titular}
                        segurados={segurados}
                    />
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Table size="small">
                        <TableHead sx={{ background: `linear-gradient(45deg, ${red[700]} 80%, ${deepPurple[800]} 95%)` }}>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="center" sx={{ color: 'white' }} >Protocolo</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }} >Status</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }} >Quantidade de Pedidos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                pacotes?.protocolos?.map((protocolo, index) => (
                                    <React.Fragment key={protocolo._id}>
                                        <TableRow>
                                            <TableCell align="left">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => setOpenSubRow(prev => ({ ...prev, [index]: !prev[index] }))}
                                                >
                                                    <Tooltip title='Detalhes'>
                                                        {openSubRow[index] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                    </Tooltip>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">{protocolo.codigo}</TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={protocolo.status}
                                                    sx={{
                                                        color: 'white',
                                                        backgroundColor: colorStatusRsdBradesco[protocolo.status],
                                                    }}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="center">{protocolo.pedidos.length}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
                                                <Collapse in={openSubRow[index]} timeout="auto" unmountOnExit>
                                                    <Box margin={1}>
                                                        <Table size="small" >
                                                            <TableHead sx={{ background: `linear-gradient(45deg, ${red[700]} 80%, ${deepPurple[700]} 95%)` }}>
                                                                <TableRow>
                                                                    <TableCell align="center" sx={{ color: 'white' }}>Sinistro</TableCell>
                                                                    <TableCell align="center" sx={{ color: 'white' }}>Data Solicitação</TableCell>
                                                                    <TableCell align="center" sx={{ color: 'white' }}>Tipo Documento</TableCell>
                                                                    <TableCell align="center" sx={{ color: 'white' }}>Conselho Profissional de Saúde</TableCell>
                                                                    <TableCell align="center" sx={{ color: 'white' }}>Especialidade</TableCell>
                                                                    <TableCell align="center" sx={{ color: 'white' }}>Status</TableCell>
                                                                    <TableCell></TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {protocolo.pedidos.map((pedido, idx) => (
                                                                    <>
                                                                        <TableRow key={pedido._id}>
                                                                            <TableCell align="center">{pedido.sinistro}</TableCell>
                                                                            <TableCell align="center">{moment(pedido.dataSolicitacao).format('DD/MM/YYYY')}</TableCell>
                                                                            <TableCell align="center">{pedido.tipoDocumento}</TableCell>
                                                                            <TableCell align="center">{pedido.conselhoProfissionalSaude}</TableCell>
                                                                            <TableCell align="center">{pedido.especialidade}</TableCell>
                                                                            <TableCell align="center">
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
                                                                        <Box>

                                                                        </Box>
                                                                    </>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Container>
                <Toast
                    open={openToast}
                    onClose={() => setOpenToast(false)}
                    message={message}
                    severity={severity}
                />
            </Sidebar>
        </>
    )
}

export default Protocolos;
