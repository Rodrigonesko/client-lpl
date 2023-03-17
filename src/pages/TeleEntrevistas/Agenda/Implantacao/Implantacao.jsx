import React, { useEffect, useState } from 'react'
import Sidebar from '../../../../components/Sidebar/Sidebar'
import Axios from 'axios'
import moment from 'moment/moment'
import { Box, CircularProgress, TableContainer, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import RelatorioPadraoTele from '../../../../components/RelatorioPadraoTele/RelatorioPadraoTele'

const Implantacao = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)

    const implantar = async (id) => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/implantar`, {
                id
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                buscarPropostas()
            }

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    const buscarPropostas = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/naoImplantadas`, { withCredentials: true })

            setPropostas(result.data)
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const relatorio = () => {
        try {

            RelatorioPadraoTele(propostas, 'Relatorio implantacao')

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarPropostas()
    }, [])

    return (
        <>
            <Sidebar />
            <Box>
                <Typography m={2} variant='h5'>
                    Implantação: {propostas.length}
                </Typography>
                {
                    loading ? (
                        <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
                    ) : null
                }
                <Box m={2}>
                    <Button onClick={relatorio} variant='contained'>Relatório</Button>
                </Box>

                <TableContainer>
                    <Table className='table'>
                        <TableHead className='table-header'>
                            <TableRow>
                                <TableCell>Vigência</TableCell>
                                <TableCell>Proposta</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Tipo Contrato</TableCell>
                                <TableCell>Houve Divergencia</TableCell>
                                <TableCell>Cids</TableCell>
                                <TableCell>Divergência</TableCell>
                                <TableCell>Concluir</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                propostas.map(e => {
                                    return (
                                        <TableRow key={e._id}>
                                            <TableCell>{moment(e.vigencia).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{e.proposta}</TableCell>
                                            <TableCell>{e.nome}</TableCell>
                                            <TableCell>{e.tipoContrato}</TableCell>
                                            <TableCell>{e.houveDivergencia}</TableCell>
                                            <TableCell>{e.cids}</TableCell>
                                            <TableCell>{e.divergencia}</TableCell>
                                            <TableCell><Button onClick={() => { implantar(e._id) }} color='success' variant='contained' size='small'>Concluir</Button></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default Implantacao