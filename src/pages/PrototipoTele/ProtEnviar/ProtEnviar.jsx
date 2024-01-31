import { Box, Button, FormControlLabel, LinearProgress, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Tooltip, Typography } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { filterPropostasNaoEnviadas, sendMessageSaudacao } from '../../../_services/teleEntrevistaExterna.service'
import { ArrowRight } from "@mui/icons-material";
import Toast from "../../../components/Toast/Toast";
import ProtAjustar from "./Components/ProtAjustar";
import NaoRespondias from "./Components/NaoRespondidas";

const ProtEnviar = () => {

    const [propostas, setPropostas] = useState([])
    const [todasPropostas, setTodasPropostas] = useState([])
    const [pesquisa, setPesquisa] = useState('')
    const [loading, setLoading] = useState(false)
    const [selecionarTodas, setSelecionarTodas] = useState(false)
    const [flush, setFlush] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastSeverity, setToastSeverity] = useState('success')
    const [tab, setTab] = useState('Enviar')

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const res = await filterPropostasNaoEnviadas({
                status: 'Cancelado'
            })
            setPropostas(res.propostasSemDependentes)
            setTodasPropostas(res.result)
            setLoading(false)
        }
        fetch()
        setFlush(false)
    }, [flush])

    useEffect(() => {
        if (selecionarTodas) {
            setPropostas(todasPropostas)
        } else {
            setFlush(true)
        }
    }, [selecionarTodas])

    const handleEnviar = async (id) => {
        console.log(id);
        try {
            const result = await sendMessageSaudacao({ _id: id })
            if (result.msg !== 'ok') {
                throw new Error('Erro ao enviar mensagem!')
            }
            setFlush(true)
            setOpenToast(true)
            setToastMessage('Mensagem enviada com sucesso!')
            setToastSeverity('success')
        } catch (error) {
            setOpenToast(true)
            setToastMessage('Erro ao enviar mensagem!')
            setToastSeverity('error')
        }
    }

    return (
        <Sidebar>
            <Box m={2}>
                <Tabs
                    value={tab}
                    onChange={(e, value) => setTab(value)}
                >
                    <Tab label="Enviar" value='Enviar' />
                    <Tab label="Ajustar" value={'Ajustar'} />
                    <Tab label="Enviadas" value={'Enviadas'} />
                    <Tab label="Não Respondias" value={'NaoRespondidas'} />
                </Tabs>
                {
                    tab === 'Enviar' && (
                        <>
                            <Box display={'flex'} mb={2}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 'bold',
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            width: '30%',
                                            height: '2px',
                                            bottom: 0,
                                            left: '0%',
                                            backgroundColor: 'currentColor',
                                            transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                                        },
                                        '&:hover::after': {
                                            width: '100%',
                                            left: '0%',
                                        },
                                    }}
                                >
                                    Enviar
                                </Typography>
                            </Box>
                            <Box>
                                <form
                                    style={{
                                        display: 'flex',
                                        gap: '1rem'
                                    }}
                                >
                                    <TextField
                                        label="Pesquisar"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={pesquisa}
                                        onChange={(e) => setPesquisa(e.target.value)}
                                    />
                                </form>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold'
                                    }}
                                    mt={2}
                                >
                                    Total de propostas: {propostas.length}
                                    <FormControlLabel
                                        control={<Switch
                                            size="small"
                                            sx={{
                                                ml: 2
                                            }}
                                        />}
                                        checked={selecionarTodas}
                                        onChange={(e) => setSelecionarTodas(e.target.checked)}
                                        label="Selecionar todas"
                                    />
                                </Typography>
                            </Box>
                            <TableContainer>
                                <Table
                                    size="small"
                                >
                                    <TableHead
                                        sx={{
                                            backgroundColor: '#f5f5f5'
                                        }}
                                    >
                                        <TableRow>
                                            <TableCell>Proposta</TableCell>
                                            <TableCell>Nome</TableCell>
                                            <TableCell>CPF</TableCell>
                                            <TableCell>CPF Titular</TableCell>
                                            <TableCell>Tipo Associado</TableCell>
                                            <TableCell>Contrato</TableCell>
                                            <TableCell>Idade</TableCell>
                                            <TableCell>DDD</TableCell>
                                            <TableCell>Celular</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {!loading ? (propostas.filter(proposta => proposta.nome.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase()) || proposta.proposta.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase())).map((proposta, index) => (
                                            <TableRow
                                                key={index}
                                            >
                                                <TableCell>{proposta.proposta}</TableCell>
                                                <TableCell>{proposta.nome}</TableCell>
                                                <TableCell>{proposta.cpf}</TableCell>
                                                <TableCell>{proposta.cpfTitular}</TableCell>
                                                <TableCell>{proposta.tipoAssociado}</TableCell>
                                                <TableCell>{proposta.tipoContrato}</TableCell>
                                                <TableCell>{proposta.idade}</TableCell>
                                                <TableCell>{proposta.ddd}</TableCell>
                                                <TableCell>{proposta.celular}</TableCell>
                                                <TableCell>
                                                    <Tooltip
                                                        title="Enviar proposta"
                                                        placement="top"
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            sx={{
                                                                textTransform: 'none'
                                                            }}
                                                            onClick={() => handleEnviar(proposta._id)}
                                                        >
                                                            <ArrowRight />
                                                        </Button>
                                                    </Tooltip>

                                                </TableCell>
                                            </TableRow>
                                        ))) : (
                                            <TableRow>
                                                <TableCell colSpan={8}>
                                                    <LinearProgress />
                                                </TableCell>
                                            </TableRow>

                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Toast
                                open={openToast}
                                onClose={() => setOpenToast(false)}
                                severity={toastSeverity}
                                message={toastMessage}
                            />
                        </>
                    )
                }
                {
                    tab === 'Ajustar' && (
                        <ProtAjustar />
                    )
                }
                {
                    tab === 'Enviadas' && 'Enviadas'
                }
                {
                    tab === 'NaoRespondidas' && <NaoRespondias />
                }
            </Box>
        </Sidebar >
    )
}

export default ProtEnviar;