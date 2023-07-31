import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getOperadoras } from "../../../_services/rsd.service";
import { Container, Box, Typography, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

const OperadorasBeneficiario = () => {

    const [operadoras, setOperadoras] = useState([])

    const buscarOperadoras = async () => {
        try {

            const result = await getOperadoras()

            setOperadoras(result.operadoras)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarOperadoras()
    }, [])

    return (
        <>
            <Sidebar />
            <Container>
                <Box>
                    <Typography variant="h5" mt={2}>
                        Operadoras Beneficiário
                    </Typography>
                    <Box m={2}>
                        <Button variant="contained" color='inherit' sx={{ mr: '10px' }} href='/rsd/OperadoraBeneficiario/Criar'>Criar Operadora Beneficiário</Button>
                        <Button variant="contained" color='secondary' sx={{ mr: '10px' }} href='/rsd/formasPagamento'>Formas Pagamento</Button>
                        <Button variant="contained" color="error" sx={{ mr: '10px' }} href='/rsd/finalizacoes'>Finalizações</Button>
                    </Box>
                    <TableContainer>
                        <Table className="table">
                            <TableHead className="table-header">
                                <TableRow>
                                    <TableCell>Descrição</TableCell>
                                    <TableCell>SLA</TableCell>
                                    <TableCell>Ativo</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    operadoras.map(e => {
                                        return (
                                            <TableRow key={e._id}>
                                                <TableCell>{e.descricao}</TableCell>
                                                <TableCell>{e.sla}</TableCell>
                                                <TableCell>{e.ativo}</TableCell>
                                                <TableCell>Ativar/Desativar</TableCell>
                                                <TableCell><Button href={`/rsd/OperadoraBeneficiario/editar/${e._id}`} >Editar</Button ></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </>
    )
}

export default OperadorasBeneficiario