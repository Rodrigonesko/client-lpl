import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Axios from 'axios'
import { CircularProgress, Button, TextField, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, Container } from '@mui/material'
import ModalEntrevistasRealizadas from './ModalEntrevistasRealizadas'
import { getDadosEntrevistaByDetails } from '../../../_services/teleEntrevistaV2.service'
import Linha from './components/Linha'

const EntrevistasRealizadas = () => {

    const [entrevistas, setEntrevistas] = useState([])
    const [pesquisa, setPesquisa] = useState('');
    const [loading, setLoading] = useState(false)

    const buscarEntrevistas = async () => {
        try {
            setLoading(true)
            if (pesquisa.length < 3) {
                return
            }
            const result = await getDadosEntrevistaByDetails(pesquisa)
            setLoading(false)
            setEntrevistas(result)
        } catch (error) {
            console.log(error);
        }
    }

    const entrevistasQualidade = async () => {
        try {
            setLoading(true)
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/qualidade`, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setEntrevistas(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <Sidebar>
            <Container className='scrollable'>
                <Box m={2}>
                    <Typography variant='h6'>
                        Entrevistas Realizadas
                    </Typography>
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', left: '49%' }} />
                        ) : null
                    }
                    <Box display='flex' justifyContent='space-between' m={2}>
                        <Box display='flex'>
                            <TextField id="proposta" size='small' label="proposta, nome ou cpf" variant="standard" onChange={e => {
                                setPesquisa(e.target.value)
                            }} />
                            <Button type='submit' onClick={buscarEntrevistas} size='small' variant='contained'>Buscar</Button>
                            <Button variant='contained' onClick={entrevistasQualidade} color='info' size='small' style={{ marginLeft: '20px' }} >Filtrar entrevistas de qualidade</Button>
                        </Box>
                        <Box display='flex'>
                            <ModalEntrevistasRealizadas />
                        </Box>
                    </Box>
                    <TableContainer className="entrevistas-realizadas">
                        <Table className='table'>
                            <TableHead className='table-header'>
                                <TableRow>
                                    <TableCell>Proposta</TableCell>
                                    <TableCell>Data Entrevista</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>CPF</TableCell>
                                    <TableCell>Idade</TableCell>
                                    <TableCell>Sexo</TableCell>
                                    <TableCell>Voltar</TableCell>
                                    <TableCell>Editar</TableCell>
                                    <TableCell>PDF</TableCell>
                                    <TableCell></TableCell>    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    entrevistas.map(e => {
                                        return (
                                            <Linha
                                                key={e._id}
                                                entrevista={e}
                                            />
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </Sidebar>
    </>)
}

export default EntrevistasRealizadas