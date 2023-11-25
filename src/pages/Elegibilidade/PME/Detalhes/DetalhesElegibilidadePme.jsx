import { useEffect, useState } from "react"
import Sidebar from "../../../../components/Sidebar/Sidebar"
import { Box, Container, Typography, Paper, Divider, Alert } from "@mui/material"
import { useParams } from "react-router-dom"
import { getInfoPropostaElegibilidadePme } from "../../../../_services/elegibilidadePme.service"
import InfoElegibilidadePme from "./InfoElegebilidadePme"
import ModalConcluirElegibilidadePme from "./Modals/ModalConcluirElegibilidadePme"
import ModalDevolverElegibilidadePme from "./Modals/ModalDevolverElegiblidadePme"
import ModalRedistribuirElegibilidadePme from "./Modals/ModalRedistribuirElegibilidadePme"
import AgendaElegibilidadePme from "./AgendaElegibilidadePme"

const DetalhesElegibilidadePme = () => {

    const { id } = useParams()
    const [proposta, setProposta] = useState({})
    const [flushHook, setFlushHook] = useState(false)

    const fetchData = async () => {
        const result = await getInfoPropostaElegibilidadePme(id)

        setProposta(result)
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()

    }, [id, flushHook])

    return (
        <>
            <Sidebar>
                <Box width='100%' height='100vh' overflow='auto'>
                    <Container>
                        <Typography m={2} variant="h6" >
                            Informações da Proposta
                        </Typography>
                        <Divider />
                        {
                            proposta.status === 'Concluido' ? (
                                <Alert variant="filled" severity="success" >
                                    Proposta concluida por {proposta.analista}
                                </Alert>
                            ) : null
                        }
                        {
                            proposta.status === 'Redistribuído' ? (
                                <Alert variant="filled" severity="info" >
                                    Proposta redistribuída por {proposta.analista}
                                </Alert>
                            ) : null
                        }
                        {
                            proposta.status === 'Devolvida' ? (
                                <Alert variant="filled" severity="warning" >
                                    Proposta devolvida por {proposta.analista}
                                    <br />
                                    Motivo: {proposta.motivo}
                                </Alert>
                            ) : null
                        }
                        <Box mt={2} component={Paper} elevation={3} p={1}>
                            <Typography>
                                Proposta - {proposta.proposta} - {proposta.analista}
                            </Typography>
                            <Divider />
                            <InfoElegibilidadePme proposta={proposta} />
                            <Box m={2}>
                                {
                                    proposta.status === 'A iniciar' ? (
                                        <>
                                            <ModalConcluirElegibilidadePme setFlushHook={setFlushHook} />
                                            <ModalDevolverElegibilidadePme setFlushHook={setFlushHook} />
                                            <ModalRedistribuirElegibilidadePme setFlushHook={setFlushHook} />
                                        </>
                                    ) : null
                                }

                            </Box>
                        </Box>
                        <AgendaElegibilidadePme proposta={proposta.proposta} />
                    </Container>
                </Box>
            </Sidebar>
        </>
    )
}

export default DetalhesElegibilidadePme