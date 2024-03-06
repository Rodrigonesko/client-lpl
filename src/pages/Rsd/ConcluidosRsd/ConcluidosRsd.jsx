import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getConcluidoRsd } from "../../../_services/rsd.service";
import { TextField, Button, Box, Paper, Container, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

const ConcluidosRsd = () => {

    const [concluidos, setConcluidos] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    const pesquisar = async e => {
        try {

            e.preventDefault()
            const result = await getConcluidoRsd(pesquisa)
            setConcluidos(result.pedidos)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar>
                <Container>
                    <Typography m={2} variant="h6">
                        Concluídos
                    </Typography>
                    <form action="" onSubmit={pesquisar}>
                        <Box component={Paper} p={2}>
                            <TextField size="small" label="Marca Ótica, Protocolo, Pedido" onChange={e => setPesquisa(e.target.value)} />
                            <Button variant="contained" type="submit" >Pesquisar</Button>
                        </Box>
                    </form>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Marca Ótica</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Pedido</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    concluidos.map(e => {
                                        return (
                                            <TableRow key={e._id}>
                                                <TableCell><Link to={`/rsd/FichaBeneficiarioConcluidos/${e.mo}`}>{e.mo}</Link></TableCell>
                                                <TableCell>{e.pessoa}</TableCell>
                                                <TableCell>{e.numero}</TableCell>
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

export default ConcluidosRsd