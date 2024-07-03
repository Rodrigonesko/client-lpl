import { Box, Button, Card, CardActions, CardContent, Container, Divider, Paper, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import ModalAdicionar from "./Modais/ModalAdicionar"
import { getContingencias } from "../../_services/contingencias.service"
import { FaRegFilePdf } from "react-icons/fa"
import Title from "../../components/Title/Title"

const ControleContigencias = () => {

    const [contingencias, setContingencias] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const fetchData = async () => {
        const result = await getContingencias()
        setContingencias(result)
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
                        <Title size={'medium'}>Controle e Gestão de Contingências e Incidentes</Title>
                        <Box mt={1} mb={1}>
                            <ModalAdicionar setFlushHook={setFlushHook} contingencias={contingencias} />
                        </Box>
                        <Divider />
                        <Box component={Paper} elevation={7} p={1} mt={1} display='flex' flexWrap='wrap'>
                            {
                                contingencias.map(contingencia => {
                                    return (
                                        <Card sx={{ width: '198px', margin: '10px', bgcolor: contingencia.inativo ? 'lightgray' : '', padding: '5px' }}>
                                            <object data={`${process.env.REACT_APP_API_KEY}/media${contingencia.arquivo}`} type='application/pdf' height={250} width='100%'>
                                                PDF
                                            </object>
                                            <CardContent>
                                                <Typography variant='h6'>
                                                    {contingencia.nome}
                                                </Typography>
                                                <Typography variant='body2' color='text.secondary'>
                                                    Versão: {contingencia.versao}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button variant='contained' target='_blank' color='error' href={`${process.env.REACT_APP_API_KEY}/media${contingencia.arquivo}`} ><FaRegFilePdf /></Button>
                                            </CardActions>
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