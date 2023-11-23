import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputLabel, FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { green, red, yellow } from '@mui/material/colors';
import { updateStatus } from '../../../_services/admissaoDemissao.service';


const TabelaDemissional = ({ acoesDemissional, responsavel, fornecedor }) => {

    const [flushHook, setFlushHook] = useState(false)
    const [status, setStatus] = useState('')

    const handleChangeSelect = async () => {

        const resultado = await updateStatus(status)

        setStatus(resultado)
        setFlushHook(true)
        console.log(resultado)
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
                    {acoesDemissional.map((acao, index) => {
                        let color
                        if (index.status === 'pendente') {
                            color = red[300]
                        } if (index.status === 'em Andamento') {
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
                                            <MenuItem value={'em Andamento'}>EM ANDAMENTO</MenuItem>
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

export default TabelaDemissional