import React, { useState, useEffect } from 'react'
import Sidebar from '../../../../components/Sidebar/Sidebar'
import { Container, Box, Typography, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, } from "@mui/material";
import { getFormasPagamento } from '../../../../_services/rsd.service';
import ModalAdicionarFormaPagamento from './ModalAdicionarFormaPagamento';
import ModalDeleteFormaPagamento from './ModalDeleteFormaPagamento';

const FormasPagamento = () => {

    const [formasPagamento, setFormasPagamento] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const fetchData = async () => {

        const result = await getFormasPagamento()

        setFormasPagamento(result.formasPagamento)

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
                        <ModalAdicionarFormaPagamento flushHook={setFlushHook} />
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
                                    formasPagamento.map(servico => {
                                        return (
                                            <TableRow key={servico._id}>
                                                <TableCell>{servico.nome}</TableCell>
                                                <TableCell>
                                                    <ModalDeleteFormaPagamento id={servico._id} flushHook={setFlushHook} />
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

export default FormasPagamento