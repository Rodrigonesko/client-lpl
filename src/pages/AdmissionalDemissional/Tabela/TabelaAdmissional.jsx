import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputLabel, FormControl, MenuItem, Select, Button, Box } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';
import { createAdmissao, setarStatus } from '../../../_services/user.service';

const TabelaAdmissional = ({ user }) => {

    const [flushHook, setFlushHook] = useState(false)
    // console.log(user);

    const handleChangeStatus = async (_id, status, id) => {
        const resultado = await setarStatus({
            _id: _id, status: status, id: id, tipoExame: 'admissao'
        })
        setFlushHook(true)
        console.log(resultado)
        console.log(_id, status, id)
    }

    const criarAdmissional = async (_id) => {
        try {
            const result = await createAdmissao({ _id: user._id });
            const updatedUser = { ...user, admissao: result.admissional };

            setFlushHook(true);
        } catch (error) {
            console.error('Erro ao criar admissional:', error);
        }
    }

    useEffect(() => {
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    return (
        <TableContainer component={Paper} >
            {
                !!user.admissao & user.demissao.length !== 0 ? (
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
                            {user.admissao.map((item) => {
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
                                                <Select defaultValue={item.status} labelId="Status" id='Status' label='Status' onChange={(elemento) => handleChangeStatus(user._id, elemento.target.value, item.id)} >
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
                    <Box>
                        <br />
                        <Button type='button' onClick={criarAdmissional} variant='contained'>Criar Admissional</Button>
                        <br />
                        <br />
                    </Box>
                )
            }
        </TableContainer >

    )
}

export default TabelaAdmissional