import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputLabel, FormControl, MenuItem, Select, Button } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';
import { createDemissao, setarStatus } from '../../../_services/user.service';

const TabelaDemissional = ({ user }) => {

    const [flushHook, setFlushHook] = useState(false)

    const handleChangeStatus = async (_id, status) => {
        const resultado = await setarStatus({
            _id: _id, status: status
        })
        setFlushHook(true)
        console.log(resultado)
        console.log(_id, status)
    }

    const criarDemissional = async (_id) => {
        const result = await createDemissao({ _id: user._id })
        console.log(result);
        setFlushHook(true)
    }

    useEffect(() => {
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    return (
        <TableContainer component={Paper} >
            {
                !!user.demissao & user.demissao.length !== 0 ? (
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
                            {user.demissao.map((item) => {
                                let color
                                if (item.status === 'pendente') {
                                    color = red[300]
                                } if (item.status === 'emAndamento') {
                                    color = yellow[300]
                                } if (item.status === 'concluido') {
                                    color = green[300]
                                }
                                return (
                                    <TableRow key={item._id} style={{ backgroundColor: color }}>
                                        <TableCell>{item.responsavel}</TableCell>
                                        <TableCell>{item.acao}</TableCell>
                                        <TableCell>{item.fornecedor}</TableCell>
                                        <TableCell>{<TextField type='text' label='Obs' />}</TableCell>
                                        <TableCell>
                                            <FormControl sx={{ minWidth: 150 }}>
                                                <InputLabel id='Status'>Status</InputLabel>
                                                <Select defaultValue={item.status} labelId="Status" id='Status' label='Status' onChange={(elemento) => handleChangeStatus(item._id, elemento.target.value)} >
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
                ) : (
                    <>
                        <br />
                        <Button type='button' onClick={criarDemissional} variant='contained'>Criar Demissional</Button>
                        <br />
                        <br />
                    </>
                )
            }
        </TableContainer >
    )
}

export default TabelaDemissional