import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import TabelaPacotes from "../../../components/TabelaPacotes/TabelaPacotes";
import { criarPacoteRsd, getPedidosPorMo } from "../../../_services/rsd.service";
import InformacoesGerais from "../../../components/InformacoesGerais/InformacoesGerais";
import { Container, Box, Typography, Button, Alert, Snackbar } from "@mui/material";
import PedidosReembolso from "./PedidosReembolso/PedidosReembolso";
import { indigo } from "@mui/material/colors";


const FichaBeneficiario = () => {

    const { mo } = useParams()
    const [flushHook, setFlushHook] = useState(false)

    const [pedidos, setPedidos] = useState([])
    const [protocolos, setProtocolos] = useState([])
    const [pacotes, setPacotes] = useState([])
    const [checkPedidos, setCheckPedidos] = useState([])

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleCriarPacote = async () => {

        if (checkPedidos.length === 0) {
            return
        }

        await criarPacoteRsd({
            arrPedidos: checkPedidos
        })
        setCheckPedidos([])

        setOpen(true)
        setFlushHook(true)
    }

    useEffect(() => {

        setFlushHook(false)

        const buscarMo = async () => {

            const resultPedidos = await getPedidosPorMo(mo)

            setPedidos(resultPedidos.pedidos)

            let auxProtocolos = resultPedidos.pedidos.filter((item, pos, array) => {
                return item.status === 'A iniciar'
            })

            let arrAuxProtocolos = auxProtocolos.filter((item, pos, array) => {
                return array.map(x => x.protocolo).indexOf(item.protocolo) === pos
            })

            setProtocolos(arrAuxProtocolos)

            let arrAuxPacotes = resultPedidos.pedidos.filter((item, pos, array) => {
                return array.map(x => x.pacote).indexOf(item.pacote) === pos
            })

            setPacotes(arrAuxPacotes)
        }

        buscarMo()
    }, [mo, flushHook])

    return (
        <>
            <Sidebar>
                <Box width='100%' height='100vh' overflow='auto' display='flex' justifyContent='center'>
                    <Container style={{ maxWidth: '1400px' }} >
                        <Box className="cadastro-beneficiario-container">
                            <Typography variant="h5" m={2}>
                                Ficha Beneficiário
                            </Typography>
                            <Typography p={1} bgcolor='lightgray' borderRadius='5px' >
                                Informações Gerais
                            </Typography>
                            <InformacoesGerais mo={mo} />
                            <Typography mt={1} mb={1} p={1} bgcolor='lightgray' borderRadius='5px' >
                                Pedidos de Reembolso
                            </Typography>
                            {
                                protocolos.length !== 0 ? (
                                    <PedidosReembolso
                                        setCheckPedidos={setCheckPedidos}
                                        checkPedidos={checkPedidos}
                                        flushHook={setFlushHook}
                                        protocolos={protocolos}
                                        pedidos={pedidos}
                                    />
                                ) : null
                            }
                            <Box m={2}>
                                <Button sx={{ mr: '10px', bgcolor: indigo[500], ":hover": { bgcolor: indigo[700] } }} href={`/rsd/CriarProtocolo/${mo}`} variant="contained" size="small" >Novo Protocolo</Button>
                                <Button onClick={handleCriarPacote} sx={{ mr: '10px' }} variant="contained" size="small">Criar Pacote</Button>
                            </Box>
                            <Typography mt={1} mb={1} p={1} bgcolor='lightgray' borderRadius='5px' >
                                Pacotes
                            </Typography>

                            {
                                pacotes.length !== 0 ? (
                                    <TabelaPacotes
                                        pacotes={pacotes}
                                        pedidos={pedidos}
                                        verificaPacote={true}
                                        finalizados={false}
                                        flushHook={setFlushHook}
                                    />
                                ) : null
                            }
                        </Box>
                    </Container>

                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Pacote criado com sucesso!
                        </Alert>
                    </Snackbar>
                </Box>
            </Sidebar>
        </>
    )
}

export default FichaBeneficiario