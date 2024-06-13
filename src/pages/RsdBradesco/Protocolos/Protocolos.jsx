import { Box, Button, Chip, Collapse, Container, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import { blue, deepPurple, grey, indigo, red } from "@mui/material/colors"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Toast from "../../../components/Toast/Toast"
import { getPacoteById, getSeguradosByTitular, getTitularById } from "../../../_services/rsdBradesco.service"
import { CloudDownload, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { colorStatusRsdBradesco } from "../FichaSegurado/utils/types"
import moment from "moment"
import Ficha from "../components/Ficha"
import { valueToBRL } from "../../../functions/functions"
import Roteiro from "./components/Roteiro"

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
                    <Title size={'medium'} fontColor={indigo[800]} lineColor={red[700]}>
                        Processamento do pacote - {pacotes?.codigo}
                    </Title>
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
                                                                    <TableCell align="left" sx={{ color: 'white' }}>Sinistro</TableCell>
                                                                    <TableCell align="left" sx={{ color: 'white' }}>Data Solicitação</TableCell>
                                                                    <TableCell align="left" sx={{ color: 'white' }}>Segurado</TableCell>
                                                                    <TableCell align="left" sx={{ color: 'white' }}>cod carteirinha</TableCell>
                                                                    <TableCell align="left" sx={{ color: 'white' }}>CPF</TableCell>
                                                                    <TableCell align="left" sx={{ color: 'white' }}>Status</TableCell>
                                                                    <TableCell></TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {protocolo.pedidos.map((pedido) => (
                                                                    <>
                                                                        <TableRow >
                                                                            <TableCell align="left">{pedido.sinistro}</TableCell>
                                                                            <TableCell align="left">{moment(pedido.dataSolicitacao).format('DD/MM/YYYY')}</TableCell>
                                                                            <TableCell align="left">{pedido.segurado.nome}</TableCell>
                                                                            <TableCell align="left">{pedido.segurado.codigo}</TableCell>
                                                                            <TableCell align="left">{pedido.segurado.cpf}</TableCell>
                                                                            <TableCell align="left">
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
                                                                        <TableRow>
                                                                            <TableCell colSpan={7}>
                                                                                <Box>
                                                                                    <Grid container spacing={2} mt={1}>
                                                                                        <Grid
                                                                                            item
                                                                                            xs={12}
                                                                                            sm={2}
                                                                                        >
                                                                                            <Typography>
                                                                                                Valor Solicitado
                                                                                            </Typography>
                                                                                            <TextField
                                                                                                type='text'
                                                                                                fullWidth
                                                                                                size='small'
                                                                                                value={valueToBRL(pedido?.valorSolicitado)}
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid
                                                                                            item
                                                                                            xs={12}
                                                                                            sm={2}
                                                                                        >
                                                                                            <Typography>
                                                                                                Maior data Execução
                                                                                            </Typography>
                                                                                            <TextField
                                                                                                fullWidth
                                                                                                value={moment(pedido?.dataCriacao).format('DD/MM/YYYY')}
                                                                                                size="small"
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid
                                                                                            item
                                                                                            xs={12}
                                                                                            sm={2}
                                                                                        >
                                                                                            <Typography>
                                                                                                Tipo Evento
                                                                                            </Typography>
                                                                                            <TextField
                                                                                                fullWidth
                                                                                                value={pedido?.evento?.tipo}
                                                                                                size="small"
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid
                                                                                            item
                                                                                            xs={12}
                                                                                            sm={2}
                                                                                        >
                                                                                            <Typography>
                                                                                                Data Evento Sinistro
                                                                                            </Typography>
                                                                                            <TextField
                                                                                                fullWidth
                                                                                                value={moment(pedido?.evento?.data).format('DD/MM/YYYY')}
                                                                                                size="small"
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid
                                                                                            item
                                                                                            xs={12}
                                                                                            sm={2}
                                                                                        >
                                                                                            <Typography>
                                                                                                CPF/CNPJ do Prestador
                                                                                            </Typography>
                                                                                            <TextField
                                                                                                fullWidth
                                                                                                value={pedido?.prestador.cpfCnpj}
                                                                                                size="small"
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid
                                                                                            item
                                                                                            xs={12}
                                                                                            sm={2}
                                                                                        >
                                                                                            <Typography>
                                                                                                Prestador Serviço
                                                                                            </Typography>
                                                                                            <TextField
                                                                                                type='text'
                                                                                                fullWidth
                                                                                                size='small'
                                                                                                value={valueToBRL(pedido?.prestador?.nome)}
                                                                                            />
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid container spacing={2}>
                                                                                        <Grid
                                                                                            item
                                                                                            xs={12}
                                                                                            sm={2}
                                                                                        >
                                                                                            <Typography>
                                                                                                UF
                                                                                            </Typography>
                                                                                            <TextField
                                                                                                fullWidth
                                                                                                value={pedido?.prestador?.uf}
                                                                                                size="small"
                                                                                            />
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Divider sx={{ mt: 2, mb: 2 }} />
                                                                                </Box>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </>
                                                                ))}
                                                            </TableBody >
                                                        </Table >
                                                    </Box>
                                                </Collapse>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                >
                                                    <Grid item xs={12} sm={6}>
                                                        <TableContainer>
                                                            <Table>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            N° Tentativa
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Responsável
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Data
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {
                                                                        protocolo?.pedido?.tentativasDeContato.map((tentativa, index) => (
                                                                            <TableRow key={index}>
                                                                                <TableCell>
                                                                                    {index + 1}
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {tentativa.responsavel}
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {moment(tentativa.data).format('DD/MM/YYYY HH:mm')}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ))
                                                                    }
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                mt: 2,
                                                                bgcolor: blue[900],
                                                                color: 'white',
                                                                ':hover': {
                                                                    bgcolor: blue[800]
                                                                }
                                                            }}

                                                        >
                                                            Tentativa de Contato
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Box>
                                                            <TableContainer>
                                                                <Table>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                Nome
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                Link
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {/* {
                                                                                                        arquivos.map((arquivo, index) => ( */}
                                                                        <TableRow key={index}>
                                                                            <TableCell>
                                                                                {/* {arquivo} */}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Button
                                                                                    sx={{
                                                                                        bgcolor: blue[900],
                                                                                        color: 'white',
                                                                                        ':hover': {
                                                                                            bgcolor: blue[800]
                                                                                        }
                                                                                    }}
                                                                                    endIcon={<CloudDownload />}
                                                                                    size="small"
                                                                                    variant='text'
                                                                                // onClick={() => fileDownload(arquivo)}
                                                                                >
                                                                                    Download
                                                                                </Button>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                        {/* ))
                                                                                                    } */}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                        {/* <ModalUploadArquivo item={item} setArquivos={setArquivos} /> */}
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <Title
                        size={'small'}
                        fontColor={indigo[800]}
                        lineColor={red[700]}
                        sx={{ mt: 2 }}
                    >
                        Script
                    </Title>
                    <Box
                        mt={2}
                        mb={2}
                        sx={{
                            bgcolor: indigo[100],
                            p: 2,
                            borderRadius: '15px'
                        }}
                    >
                        <Roteiro
                            key={pacotes._id}
                            pacote={pacotes}
                            titular={titular}
                            segurado={segurados[0]}
                        />
                    </Box>
                </Container>
                <Toast
                    open={openToast}
                    onClose={() => setOpenToast(false)}
                    message={message}
                    severity={severity}
                />
            </Sidebar >
        </>
    )
}

export default Protocolos;