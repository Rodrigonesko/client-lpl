import Sidebar from '../../../components/Sidebar/Sidebar'
import { Box, Container, Typography, Divider, Paper, Card, CardActions, CardContent, CardMedia, Button } from '@mui/material'
import ModalAdicionarPolitica from './Modals/ModalAdicionarPolitica'
import { useEffect } from 'react'
import { useState } from 'react'
import { getPoliticas } from '../../../_services/politicas.service'
import { FaRegFilePdf } from 'react-icons/fa'
import ModalFaltouAssinar from './Modals/ModalFaltouAssinar'
const ControlePoliticas = () => {

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
            <Sidebar />
            <Box width='100%' height='100vh' overflow='auto'>
                <Container>
                    <Typography m={2} variant='h6'>
                        Controle e Gestão de Políticas
                    </Typography>
                    <Divider />
                    <Box mt={1} mb={1}>
                        <ModalAdicionarPolitica setFlushHook={setFlushHook} politicas={politicas} />
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
                                        <CardActions>
                                            <Button variant='contained' target='_blank' color='error' href={`${process.env.REACT_APP_API_KEY}/media${politica.arquivo}`} ><FaRegFilePdf /></Button>
                                            <ModalFaltouAssinar id={politica._id} />
                                        </CardActions>
                                    </Card>
                                )
                            })
                        }
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default ControlePoliticas