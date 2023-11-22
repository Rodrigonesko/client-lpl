import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputLabel, FormControl, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { green, red, yellow } from '@mui/material/colors';


const TabelaAdmissional = ({ acoesAdmissional, responsavel, fornecedor }) => {

    const [flushHook, setFlushHook] = useState(false)

    const handleChangeSelect = async (id, status) => {
        const resultado = await axios.put(`${process.env.REACT_APP_API_KEY}/admissaoDemissao/status`, {
            status: status, _id: id
        })
        setFlushHook(true)
        console.log(resultado)
        console.log(id, status)
    }

    useEffect(() => {
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow className="table-header">
                        <TableCell>RESPONSAVEL</TableCell>
                        <TableCell>AÇÃO</TableCell>
                        <TableCell>FORNECEDOR</TableCell>
                        <TableCell>OBSERVAÇÃO</TableCell>
                        <TableCell>STATUS</TableCell>
                        <TableCell>DATA</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {acoesAdmissional.map((acao, index) => {
                        let color
                        if (index.status === 'pendente') {
                            color = red[300]
                        } if (index.status === 'emAndamento') {
                            color = yellow[300]
                        } if (index.status === 'concluido') {
                            color = green[300]
                        }
                        return (
                            <TableRow key={index._id} style={{ backgroundColor: color }}>
                                <TableCell>{<TableRow >{responsavel[index]}</TableRow>}</TableCell>
                                <TableCell>{<TableRow key={index}>{acao}</TableRow>}</TableCell>
                                <TableCell>{<TableRow >{fornecedor[index]}</TableRow>}</TableCell>
                                <TableCell>{<TextField type='text' label='Obs' />}</TableCell>
                                <TableCell>
                                    <FormControl sx={{ minWidth: 135 }}>
                                        <InputLabel id='Status'>Status</InputLabel>
                                        <Select defaultValue={index.status} labelId="Status" id='Status' label='Status' onChange={(elemento) => handleChangeSelect(index._id, elemento.target.value)} >
                                            <MenuItem value={'pendente'}>PENDENTE</MenuItem>
                                            <MenuItem value={'emAndamento'}>EM ANDAMENTO</MenuItem>
                                            <MenuItem value={'concluido'}>CONCLUIDO</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>{<TextField type='date' focused label='Data' />}</TableCell>
                            </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default TabelaAdmissional