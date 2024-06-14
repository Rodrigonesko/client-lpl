import { Box, Button, Chip, Collapse, Container, Divider, FormControlLabel, Grid, IconButton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import { blue, deepPurple, grey, indigo, red } from "@mui/material/colors"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Toast from "../../../components/Toast/Toast"
import { getPacoteById, getSeguradosByTitular, getTitularById, tentativaDeContato, updatePacote } from "../../../_services/rsdBradesco.service"
import { CloudDownload, KeyboardArrowDown, KeyboardArrowUp, SaveAs } from "@mui/icons-material"
import { colorStatusRsdBradesco } from "../FichaSegurado/utils/types"
import moment from "moment"
import Ficha from "../components/Ficha"
import { valueToBRL } from "../../../functions/functions"
import Roteiro from "./components/Roteiro"
import ModalParecer from "./components/ModalParecer"
import ModalUploadArquivo from "./components/ModalUploadArquivo"

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

const Protocolos = () => {

    const { id } = useParams();

    const [pacotes, setPacotes] = useState([]);
    const [segurados, setSegurados] = useState([]);
    const [titular, setTitular] = useState();

    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const [openSubRow, setOpenSubRow] = useState(false)

    const [dossie, setDossie] = useState(false)

    const handleTentativaContato = async () => {
        try {
            const data = {
                responsavel: 'Teste',
                data: new Date()
            }
            const result = await tentativaDeContato(id)
            console.log(result);
            setMessage('Tentativa de contato registrada com sucesso')
            setSeverity('success')
            setOpenToast(true)
        } catch (error) {
            console.log(error);
            setMessage('Erro ao registrar tentativa de contato')
            setSeverity('error')
            setOpenToast(true)
        }

    }

    const handleUpdateDossie = async (e) => {
        try {
            setDossie(e.target.value)
            const upd = await updatePacote(
                id,
                dossie
            )
            console.log(upd);
            setMessage('Dossiê solicitado com sucesso')
            setSeverity('success')
            setOpenToast(true)
        } catch (error) {
            console.log(error);
            setMessage('Erro ao Atualizar Dossiê')
            setSeverity('error')
            setOpenToast(true)
        }
    }

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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Title
                            size={'small'}
                            fontColor={indigo[800]}
                            lineColor={red[500]}
                            sx={{ mt: 2 }}
                        >
                            Sub Pacotes
                        </Title>
                        <FormControlLabel control={<Switch color='success' value={dossie} onChange={handleUpdateDossie} />} label='Realizar Dossiê' />
                    </Box>
                    <Table size="small">
                        <TableHead sx={{ background: `linear-gradient(45deg, ${red[700]} 80%, ${deepPurple[800]} 95%)` }}>
                            <TableRow>
                                <TableCell width={'20px'} align="left"></TableCell>
                                <TableCell align="left" sx={{ color: 'white' }} >Sub Pacote</TableCell>
                                <TableCell align="left" sx={{ color: 'white' }} >Quantidade de Pedidos</TableCell>
                                <TableCell align="left" sx={{ color: 'white' }} >Status</TableCell>
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
                                            <TableCell align="left">{protocolo.codigo}</TableCell>
                                            <TableCell align="left">{protocolo.pedidos.length}</TableCell>
                                            <TableCell align="left">
                                                <Chip
                                                    label={protocolo.status}
                                                    sx={{
                                                        color: 'white',
                                                        backgroundColor: colorStatusRsdBradesco[protocolo.status],
                                                    }}
                                                    size="small"
                                                />
                                            </TableCell>
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
                                                                    <TableCell align="left" sx={{ color: 'white' }}>Cod Carteirinha</TableCell>
                                                                    <TableCell align="left" sx={{ color: 'white' }}>CPF</TableCell>
                                                                    <TableCell align="left" sx={{ color: 'white' }}>Status</TableCell>
                                                                    <TableCell></TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {protocolo.pedidos.map((pedido, index) => (
                                                                    <React.Fragment key={index} >
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
                                                                                    <Grid item xs={12} sm={2}>
                                                                                        <ModalParecer id={pedido?._id} setOpenToast={setOpenToast} setMessage={setMessage} setSeverity={setSeverity} />
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </React.Fragment>
                                                                ))}
                                                            </TableBody >
                                                        </Table >
                                                    </Box>
                                                </Collapse>

                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))
                            }
                        </TableBody>
                    </Table>
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
                                        {/* {
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
                                        } */}

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
                                onClick={handleTentativaContato}
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
                                            <TableRow>
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
                            <ModalUploadArquivo />
                        </Grid>
                    </Grid>
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