import React, { useEffect, useState, useContext } from "react";
import SideBar from '../../components/Sidebar/Sidebar'
import AuthContext from "../../context/AuthContext";
import { Button, TextField, Box, Snackbar, Alert, Container, Typography, Paper, Link, Chip, CircularProgress } from "@mui/material";
import { getInfoUser, updatePassword } from "../../_services/user.service";
import ModalAceitarPoliticas from "../../components/ModalAceitarPoliticas/ModalAceitarPoliticas";
import { getPoliticasAtivas } from "../../_services/politicas.service";
import { getVerificarTreinamento } from "../../_services/treinamento.service";
import moment from "moment";
import CardBancoHoras from "./cards/CardBancoHoras";
import CardAniversariantes from "./cards/CardAniversariantes";
import ModalAdicionarMural from "./modais/ModalAdicionarMural";
import CardMural from "./cards/CardMural";
import CardToDo from "./cards/CardToDo";
import { red } from "@mui/material/colors";
import ModalAnexarArquivoTreinamento from "./modais/ModalAnexarArquivoTreinamento";
import CardAniversarioEmpresa from "./cards/CardAniversarioEmpresa";

const Home = () => {

    const [firstAccess, setFirstAccess] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const [openSnack, setOpenSnack] = useState(false)
    const [severitySnack, setSeveritySnack] = useState('')

    const [open, setOpen] = useState(false)
    const [flushHook, setFlushHook] = useState(false)
    const [loading, setLoading] = useState(false)
    const [idPolitica, setIdPolitica] = useState('')
    const [treinamentos, setTreinamentos] = useState([])
    const [dataUser, setDataUser] = useState(null)
    const [userData, setUserData] = useState({})

    const { name } = useContext(AuthContext)

    const handleClose = async () => {
        setOpen(false)
        setOpenSnack(false)
    }

    const fetchData = async () => {
        const { user } = await getInfoUser()
        setUserData(user)
    }

    useEffect(() => {
        fetchData()
    }, [name])

    const handlerUpdatePassword = async () => {
        try {
            await updatePassword({
                password,
                confirmPassword
            })
            window.location.reload()
        } catch (error) {
            setMessage(error.response.data.message)
            setSeveritySnack('error')
        }
    }

    const fetchInfoUser = async () => {

        try {
            const result = await getInfoUser()
            setDataUser(result.user)
            if (result.user.firstAccess === 'Sim') {
                setFirstAccess(true)
            }
            const resultPoliticas = await getPoliticasAtivas()
            const politicasLidas = result.user.politicasLidas
            const politicasNaoLidas = []
            for (const item of resultPoliticas) {
                const find = politicasLidas.some((idPolitica) => item._id === idPolitica)
                if (!find) {
                    politicasNaoLidas.push(item)
                }
            }
            const resultTreinamentos = await getVerificarTreinamento()
            setTreinamentos(resultTreinamentos);
            setIdPolitica(politicasNaoLidas[0])
            if (politicasNaoLidas.length !== 0) {
                setOpen(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setFlushHook(false)
        fetchInfoUser()
    }, [flushHook])

    return (
        <>
            <SideBar>
                <Container maxWidth sx={{ textAlign: 'center' }} component={Paper}>
                    <Box>
                        <Typography variant="h4">
                            Bem vindo {name}!
                        </Typography>
                        {
                            firstAccess && (
                                <div className="first-access">
                                    <div className="title">
                                        <h2>É sua primeira vez acessando o sistema</h2>
                                        <h3>Por favor defina uma senha por gentileza</h3>
                                    </div>
                                    <div className="inputs-container">
                                        <Box m={2}>
                                            <TextField type="password" name="password" id="password" label='Senha' onChange={e => setPassword(e.target.value)} />
                                        </Box>
                                        <Box m={2}>
                                            <TextField type="password" name="confirmPassword" id="confirmPassword" label='Confirmar senha' onChange={e => setConfirmPassword(e.target.value)} />
                                        </Box>
                                    </div>
                                    <div className="btn-container">
                                        <Button variant='contained' onClick={handlerUpdatePassword}>Enviar</Button>
                                    </div>
                                </div>
                            )
                        }

                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={openSnack}
                            onClose={handleClose}
                        >
                            <Alert onClose={handleClose} variant='filled' severity={severitySnack} sx={{ width: '100%' }}>
                                {message}
                            </Alert>
                        </Snackbar>
                    </Box>
                    <Box>
                        {treinamentos.map(treinamento => {
                            return (
                                <Alert severity="error" sx={{ width: '100%', m: 1, borderRadius: '15px' }}>
                                    <Box sx={{ textAlign: 'start' }}>
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            fontWeight={'bold'}
                                        >
                                            Treinamento: {treinamento.nome}
                                        </Typography>
                                        <Typography>
                                            Plataforma: {treinamento.plataforma}
                                        </Typography>
                                        <Typography
                                            mt={1}
                                        >
                                            Link:
                                            <Link
                                                href={'https://' + treinamento.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                color="inherit"
                                                underline="hover"
                                                sx={{
                                                    marginLeft: '5px',
                                                    bgcolor: red[800],
                                                    color: '#fff',
                                                    '&:hover': {
                                                        bgcolor: red[900],
                                                    },
                                                    '&:active': {
                                                        bgcolor: red[900],
                                                    },
                                                    '&:focus': {
                                                        bgcolor: red[900],
                                                    },
                                                    padding: '2px',
                                                    borderRadius: '10px'
                                                }}
                                            >
                                                {treinamento.link}
                                            </Link>
                                        </Typography>
                                        {/*Deixar o prazo mais destacado*/}
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            fontWeight={'bold'}
                                            color={'#000'}
                                            mt={1}
                                        >
                                            <Chip
                                                label={`Prazo: ${moment(treinamento.prazo).format('DD/MM/YYYY')}`}
                                                color="warning"
                                                sx={{ marginRight: '5px' }}
                                            />
                                        </Typography>
                                        <Typography>
                                            {
                                                treinamento.observacoes && (
                                                    <>
                                                        Observacões:
                                                        {treinamento.observacoes.split('\n').map((item, key) => {
                                                            return <span key={key}>{item}<br /></span>
                                                        })}
                                                    </>
                                                )
                                            }
                                        </Typography>
                                        {/* Por gentileza realizar o treinamento e enviar o certificado para o coordenador no e-mail: sgiazzon@lplseguros.com.br */}
                                    </Box>
                                    <ModalAnexarArquivoTreinamento
                                        id={treinamento._id}
                                        setFlushHook={setFlushHook}
                                    />
                                </Alert>
                            )
                        })}
                    </Box>
                    <Box display={'flex'} mt={2}>
                        <Box>
                            {
                                dataUser !== null && dataUser.accessLevel !== 'false' && (
                                    <ModalAdicionarMural setFlushHook={setFlushHook} />
                                )
                            }
                            {
                                dataUser !== null && (
                                    <CardBancoHoras data={dataUser} />
                                )
                            }
                            {
                                dataUser !== null && (
                                    <CardAniversariantes data={userData} flushHook={flushHook} />
                                )
                            }
                            {
                                dataUser !== null && (
                                    <CardAniversarioEmpresa />
                                )
                            }
                            {
                                dataUser !== null && (
                                    <CardToDo data={userData} flushHook={flushHook} setFlushHook={setFlushHook} />
                                )
                            }
                        </Box>
                        <Box width={'100%'} ml={2}>
                            {
                                loading ? (
                                    <CircularProgress style={{ position: 'initial', top: '50%', right: '50%' }} />
                                ) : (
                                    dataUser !== null && (
                                        <CardMural dataUser={dataUser} flushHook={flushHook} setFlushHook={setFlushHook} setLoading={setLoading} />
                                    )
                                )
                            }
                        </Box>
                    </Box>
                    {
                        idPolitica ? (
                            <ModalAceitarPoliticas setOpen={setOpen} open={open} idPolitica={idPolitica} setFlushHook={setFlushHook} />
                        ) : null
                    }
                </Container>
            </SideBar>
        </>

    )
}

export default Home