import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Painel from "../../../components/Painel/Painel";
import './PainelProcessos.css'
import { filtroPedidosNaoFinalizados, getPedidosNaoFinalizados } from "../../../_services/rsd.service";
import { Container, Box, Typography, Paper, TextField, Button, Skeleton, Snackbar, Alert } from "@mui/material";

const PainelProcessos = () => {

    const [statusVencidoIniciar, setStatusVencidoInciar] = useState(false)
    const [statusVenceHojeIniciar, setStatusVenceHojeInciar] = useState(false)
    const [statusVenceAmanhaIniciar, setStatusVenceAmanhaInciar] = useState(false)
    const [statusVence2Iniciar, setStatusVence2Inciar] = useState(false)
    const [statusVence3Iniciar, setStatusVence3Inciar] = useState(false)
    const [statusVence4Iniciar, setStatusVence4Iniciar] = useState(false)

    const [statusVencidoAgendado, setStatusVencidoAgendado] = useState(false)
    const [statusVenceHojeAgendado, setStatusVenceHojeAgendado] = useState(false)
    const [statusVenceAmanhaAgendado, setStatusVenceAmanhaAgendado] = useState(false)
    const [statusVence2Agendado, setStatusVence2Agendado] = useState(false)
    const [statusVence3Agendado, setStatusVence3Agendado] = useState(false)
    const [statusVence4Agendado, setStatusVence4Agendado] = useState(false)

    const [statusVencidoAgc, setStatusVencidoAgc] = useState(false)
    const [statusVenceHojeAgc, setStatusVenceHojeAgc] = useState(false)
    const [statusVenceAmanhaAgc, setStatusVenceAmanhaAgc] = useState(false)
    const [statusVence2Agc, setStatusVence2Agc] = useState(false)
    const [statusVence3Agc, setStatusVence3Agc] = useState(false)
    const [statusVence4Agc, setStatusVence4Agc] = useState(false)

    const [statusVencidoAgd, setStatusVencidoAgd] = useState(false)
    const [statusVenceHojeAgd, setStatusVenceHojeAgd] = useState(false)
    const [statusVenceAmanhaAgd, setStatusVenceAmanhaAgd] = useState(false)
    const [statusVence2Agd, setStatusVence2Agd] = useState(false)
    const [statusVence3Agd, setStatusVence3Agd] = useState(false)
    const [statusVence4Agd, setStatusVence4Agd] = useState(false)

    const [pedidos, setPedidos] = useState([])

    const [openSnack, setOpenSnack] = useState(false)
    const [flushHook, setFlushHook] = useState(false)

    const [aIniciar, setAiniciar] = useState([])
    const [agendados, setAgendados] = useState([])
    const [aguardandoContatos, setAguardandoContatos] = useState([])
    const [aguardandoDocs, setAguardandoDocs] = useState([])

    const [teste, setTeste] = useState('')

    const [pesquisa, setPesquisa] = useState('')

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const pesquisaFiltro = async (e) => {
        try {
            e.preventDefault()

            if (pesquisa.length <= 0) {
                setOpenSnack(true)
                return
            }

            const result = await filtroPedidosNaoFinalizados(pesquisa)
            setFlushHook(true)
            setPedidos(result.pedidos)
            setAiniciar([])
            setAgendados([])
            setAguardandoContatos([])
            setAguardandoDocs([])

            result.pedidos.forEach(e => {
                if (e.status === 'A iniciar') {
                    setAiniciar(aIniciar => [...aIniciar, e])
                }
                if (e.status === 'Em andamento') {
                    setAgendados(agendados => [...agendados, e])
                }
                if (e.status === 'Aguardando Retorno Contato') {
                    setAguardandoContatos(aguardandoContatos => [...aguardandoContatos, e])
                }
                if (e.status === 'Aguardando Docs') {
                    setAguardandoDocs(aguardandoDocs => [...aguardandoDocs, e])
                }
            })
            return

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        const buscarPedidos = async () => {
            try {

                const result = await getPedidosNaoFinalizados()

                setPedidos(result.pedidos)

                setTeste('teste')

            } catch (error) {
                console.log(error);
            }
        }

        const setStatusPedido = () => {
            pedidos.forEach(e => {

                if (e.status === 'A iniciar') {
                    setAiniciar(aIniciar => [...aIniciar, e])
                }
                if (e.status === 'Em andamento') {
                    setAgendados(agendados => [...agendados, e])
                }
                if (e.status === 'Aguardando Retorno Contato') {
                    setAguardandoContatos(aguardandoContatos => [...aguardandoContatos, e])
                }
                if (e.status === 'Aguardando Docs') {
                    setAguardandoDocs(aguardandoDocs => [...aguardandoDocs, e])
                }
            })

        }

        setFlushHook(false)
        buscarPedidos()
        setStatusPedido()
    }, [teste, flushHook])

    return (
        <>
            <Sidebar>
                <Container style={{ display: 'flex', justifyContent: 'center' }}>
                    <Box>
                        <Typography mt={2} variant="h6">
                            Painel de Processos
                        </Typography>
                        <form action="">
                            <Box component={Paper} display='flex' p={2} mb={2} mt={2} >
                                <TextField size="small" type="text" label="Marca ótica, nome, CPF, Protocolo" onChange={e => setPesquisa(e.target.value)} style={{ marginRight: '10px' }} />
                                {/* <select name="analista" id="analista">
                                <option value="">Analista</option>
                            </select> */}
                                <Button type="submit" variant="contained" onClick={pesquisaFiltro} >Pesquisar</Button>
                            </Box>
                        </form>
                        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                            <Alert variant="filled" onClose={handleCloseSnack} severity='warning' sx={{ width: '100%' }}>
                                Digite algum valor!
                            </Alert>
                        </Snackbar>
                        <div className="painel-processos">

                            {
                                pedidos.length === 0 ? (
                                    <Box minWidth='500px' width='100%' display='flex' justifyContent='space-between' >
                                        <Box width='100px' >
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                        </Box>
                                        <Box width='100px'>
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                        </Box>
                                        <Box width='100px' >
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                        </Box>
                                        <Box width='100px' >
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                        </Box>
                                    </Box>
                                ) : (
                                    <>
                                        <Painel
                                            statusVencido={statusVencidoIniciar}
                                            statusVenceHoje={statusVenceHojeIniciar}
                                            statusVenceAmanha={statusVenceAmanhaIniciar}
                                            statusVence2={statusVence2Iniciar}
                                            statusVence3={statusVence3Iniciar}
                                            statusVence4={statusVence4Iniciar}
                                            setStatusVencido={setStatusVencidoInciar}
                                            setStatusVenceHoje={setStatusVenceHojeInciar}
                                            setStatusVenceAmanha={setStatusVenceAmanhaInciar}
                                            setStatusVence2={setStatusVence2Inciar}
                                            setStatusVence3={setStatusVence3Inciar}
                                            setStatusVence4={setStatusVence4Iniciar}
                                            title={'A iniciar'}
                                            protocolos={aIniciar}
                                        />
                                        <div className="painel">
                                            <Painel
                                                statusVencido={statusVencidoAgendado}
                                                statusVenceHoje={statusVenceHojeAgendado}
                                                statusVenceAmanha={statusVenceAmanhaAgendado}
                                                statusVence2={statusVence2Agendado}
                                                statusVence3={statusVence3Agendado}
                                                statusVence4={statusVence4Agendado}
                                                setStatusVencido={setStatusVencidoAgendado}
                                                setStatusVenceHoje={setStatusVenceHojeAgendado}
                                                setStatusVenceAmanha={setStatusVenceAmanhaAgendado}
                                                setStatusVence2={setStatusVence2Agendado}
                                                setStatusVence3={setStatusVence3Agendado}
                                                setStatusVence4={setStatusVence4Agendado}
                                                title={'Agendado'}
                                                protocolos={agendados}
                                            />
                                        </div>
                                        <div className="painel">
                                            <Painel
                                                statusVencido={statusVencidoAgc}
                                                statusVenceHoje={statusVenceHojeAgc}
                                                statusVenceAmanha={statusVenceAmanhaAgc}
                                                statusVence2={statusVence2Agc}
                                                statusVence3={statusVence3Agc}
                                                statusVence4={statusVence4Agc}
                                                setStatusVencido={setStatusVencidoAgc}
                                                setStatusVenceHoje={setStatusVenceHojeAgc}
                                                setStatusVenceAmanha={setStatusVenceAmanhaAgc}
                                                setStatusVence2={setStatusVence2Agc}
                                                setStatusVence3={setStatusVence3Agc}
                                                setStatusVence4={setStatusVence4Agc}
                                                title={'Aguardando Contato'}
                                                protocolos={aguardandoContatos}
                                            />
                                        </div>
                                        <div className="painel">
                                            <Painel
                                                statusVencido={statusVencidoAgd}
                                                statusVenceHoje={statusVenceHojeAgd}
                                                statusVenceAmanha={statusVenceAmanhaAgd}
                                                statusVence2={statusVence2Agd}
                                                statusVence3={statusVence3Agd}
                                                statusVence4={statusVence4Agd}
                                                setStatusVencido={setStatusVencidoAgd}
                                                setStatusVenceHoje={setStatusVenceHojeAgd}
                                                setStatusVenceAmanha={setStatusVenceAmanhaAgd}
                                                setStatusVence2={setStatusVence2Agd}
                                                setStatusVence3={setStatusVence3Agd}
                                                setStatusVence4={setStatusVence4Agd}
                                                title={'Aguardando Doc'}
                                                protocolos={aguardandoDocs}
                                            />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </Box>
                </Container >
            </Sidebar>

        </>
    )
}

export default PainelProcessos