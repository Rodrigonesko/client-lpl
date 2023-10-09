import React, { useEffect, useState, useContext } from "react";
import SideBar from '../../components/Sidebar/Sidebar'
import AuthContext from "../../context/AuthContext";
import { Button, TextField, Box, Snackbar, Alert, Container, Typography, Paper } from "@mui/material";
import { getInfoUser, updatePassword } from "../../_services/user.service";
import ModalAceitarPoliticas from "../../components/ModalAceitarPoliticas/ModalAceitarPoliticas";
import { getPoliticasAtivas } from "../../_services/politicas.service";
import { getVerificarTreinamento } from "../../_services/treinamento.service";
import moment from "moment";
import CardBancoHoras from "./cards/CardBancoHoras";
import CardAniversariantes from "./cards/CardAniversariantes";
import ModalAdicionarMural from "./modais/ModalAdicionarMural";
import CardMural from "./cards/CardMural";

const Home = () => {

    const [firstAccess, setFirstAccess] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)
    const [flushHook, setFlushHook] = useState(false)
    const [idPolitica, setIdPolitica] = useState('')
    const [treinamentos, setTreinamentos] = useState([])
    const { name } = useContext(AuthContext)

    const handlerUpdatePassword = async () => {
        try {
            await updatePassword({
                password,
                confirmPassword
            })
            window.location.reload()
        } catch (error) {
            setMessage(error.response.data.message)
            setError(true)
        }

    }

    const fetchInfoUser = async () => {

        try {
            const result = await getInfoUser()
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
            <SideBar />
            <Container sx={{ textAlign: 'center' }} component={Paper}>
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
                        open={error}
                        onClose={() => setError(false)}
                    >
                        <Alert onClose={() => setError(false)} variant='filled' severity="error" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                </Box>
                <Box>
                    {treinamentos.map(treinamento => {
                        return (
                            <Alert severity="warning" sx={{ width: '100%', textAlign: 'start', m: 1 }}>
                                <Typography>
                                    Treinamento: {treinamento.nome}
                                </Typography>
                                <Typography>
                                    Plataforma: {treinamento.plataforma}
                                </Typography>
                                <Typography>
                                    Link: {treinamento.link}
                                </Typography>
                                <Typography>
                                    Prazo: {moment(treinamento.prazo).format('DD/MM/YYYY')}
                                </Typography>
                                <Typography>
                                    {
                                        treinamento.observacoes && (
                                            <>

                                                Observacões: {treinamento.observacoes}
                                            </>
                                        )
                                    }
                                </Typography>
                                Por gentileza realizar o treinamento e enviar o certificado para o coordenador no e-mail: sgiazzon@lplseguros.com.br
                            </Alert>
                        )
                    })}
                </Box>
                <Box display={'flex'} mt={2}>
                    <Box>
                        <ModalAdicionarMural />
                        <CardBancoHoras />
                        <CardAniversariantes />
                    </Box>
                    <Box width={'100%'} ml={2}>
                        <CardMural />
                    </Box>
                </Box>
                {
                    idPolitica ? (
                        <ModalAceitarPoliticas setOpen={setOpen} open={open} idPolitica={idPolitica} setFlushHook={setFlushHook} />
                    ) : null
                }
            </Container>
        </>

    )
}

export default Home