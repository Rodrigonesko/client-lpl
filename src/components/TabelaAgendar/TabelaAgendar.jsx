import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Link, TextField } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import moment from "moment/moment";

const TabelaAgendar = ({ propostas }) => {

    console.log(propostas);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Data Vigência</TableCell>
                        <TableCell>Proposta</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Telefone</TableCell>
                        <TableCell>Cancelar</TableCell>
                        <TableCell>Excluir</TableCell>
                        <TableCell>Formulario</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        propostas.map(row => {
                            return (
                                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{moment(row.vigencia).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{row.proposta}</TableCell>
                                    <TableCell>{row.beneficiario}</TableCell>
                                    <TableCell><TextField defaultValue={row.telefones}></TextField></TableCell>
                                    <TableCell><Button variant="contained" color="error" size="small" >Cancelar</Button></TableCell>
                                    <TableCell><Button variant="contained" color="error" size="small">Excluir</Button></TableCell>
                                    <TableCell><Link component="button" variant="body2"><LinkRouter to='/' variant="contained" size="small" >Formulario</LinkRouter></Link> </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>

        </TableContainer>
    )
}

export default TabelaAgendar