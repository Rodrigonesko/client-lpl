import React, { useState, useEffect } from 'react'
import Sidebar from '../../../../components/Sidebar/Sidebar'
import { Container, Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, } from "@mui/material";
import ModalAdicionarFinalizacao from './ModalAdicionarFinalizacao';
import ModalDeleteFinalizacao from './ModalDeleteFinalizacao';
import { getStatusFinalizacao } from '../../../../_services/rsd.service';

const Finalizacoes = () => {

    const [finalizacoes, setFinalizacoes] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const fetchData = async () => {

        const result = await getStatusFinalizacao()

        setFinalizacoes(result.statusFinalizacoes)

    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook])


    return (
        <>
            <Sidebar>
                <Container>
                    <Box>
                        <Typography variant='h5' mt={2}>
                            Confirmação de Serviço
                        </Typography>
                    </Box>
                    <Box m={2}>
                        <ModalAdicionarFinalizacao flushHook={setFlushHook} />
                    </Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Serviço</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    finalizacoes.map(finalizacao => {
                                        return (
                                            <TableRow key={finalizacao._id}>
                                                <TableCell>{finalizacao.descricao}</TableCell>
                                                <TableCell>
                                                    <ModalDeleteFinalizacao id={finalizacao._id} flushHook={setFlushHook} />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Sidebar>
        </>
    )
}

export default Finalizacoes