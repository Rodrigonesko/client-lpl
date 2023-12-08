import { Box, Card, CardContent, Container, Divider, Paper, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import ModalAdicionar from "./Modais/ModalAdicionar"
import { getPoliticas } from "../../_services/politicas.service"

const ControleContigencias = () => {

    const [politicas, setPoliticas] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const fetchData = async () => {
        const result = await getPoliticas()
        setPoliticas(result)
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()

    }, [flushHook])

    return (
        <>
            <Sidebar>
                <Box>
                    <Container maxWidth >
                        <Typography m={2} variant='h6'>
                            Controle e Gestão de Contingencias e Incidencias!
                        </Typography>
                        <Box mt={1} mb={1}>
                            <ModalAdicionar setFlushHook={setFlushHook} politicas={politicas} />
                        </Box>
                        <Divider />
                        <Box component={Paper} p={1} mt={1} display='flex' flexWrap='wrap'>
                            {
                                politicas.map(politica => {
                                    return (
                                        <Card sx={{ width: '200px', margin: '10px', bgcolor: politica.inativo ? 'lightgray' : '', padding: '5px' }}>
                                            <object data={`${process.env.REACT_APP_API_KEY}/media${politica.arquivo}`} type='application/pdf' height={250} width='100%'>
                                                PDF
                                            </object>
                                            <CardContent>
                                                <Typography variant='h6'>
                                                    {politica.nome}
                                                </Typography>
                                                <Typography variant='body2' color='text.secondary'>
                                                    Versão: {politica.versao}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    )
                                })
                            }
                        </Box>
                    </Container>
                </Box>
            </Sidebar>
        </>
    )
}

export default ControleContigencias