import React, { useEffect, useState } from 'react'
import Sidebar from '../../../../components/Sidebar/Sidebar'
import Axios from 'axios'
import moment from 'moment/moment'
import { Box, TableContainer, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'

const Implantacao = () => {

    const [propostas, setPropostas] = useState([])

    const implantar = async (id) => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/implantar`, {
                id
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                window.location.reload()
            }

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const buscarPropostas = async () => {
            try {

                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/naoImplantadas`, { withCredentials: true })

                setPropostas(result.data)

            } catch (error) {
                console.log(error);
            }
        }

        buscarPropostas()
    }, [])

    return (
        <>
            <Sidebar />
            <Box>
                <Typography m={2} variant='h5'>
                    Implantação: {propostas.length}
                </Typography>
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