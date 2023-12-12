import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputLabel, FormControl, MenuItem, Select, Button, Box } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';
import { createToDo } from '../../../_services/toDo.service';
import { createAdmissao, setarStatus, updateData, updateObs } from '../../../_services/admissaoDemissao.service';

const TabelaAdmissional = ({ user, setUser }) => {

    const handleChangeStatus = async (_id, status, id) => {
        const resultado = await setarStatus({
            _id: _id, status: status, id: id, tipoExame: 'admissao'
        })
        setUser(resultado)
        console.log(resultado)
        console.log(_id, status, id)
    }

    const criarAdmissional = async (_id) => {
        try {
            const result = await createAdmissao({ _id: user._id });
            console.log(result);

            const resultadoToDo = await createToDo({ _id: user._id });
            console.log(resultadoToDo)

            setUser(result)
        } catch (error) {
            console.error('Erro ao criar admissional:', error);
        }
    }

    const ativarObs = async (_id, obs, id) => {
        try {
            const result = await updateObs({
                _id: user._id, obs: obs, id: id, tipoExame: 'admissao'
            });
            // console.log(result);

            setUser(result)
            console.log(_id, obs, id);
        } catch (error) {
            console.error('Erro no Update das Observações:', error);
        }
    }

    const ativarData = async (_id, data, id) => {
        try {
            const result = await updateData({
                _id: user._id, data: data, id: id, tipoExame: 'admissao'
            });
            // console.log(result);

            setUser(result)
            console.log(_id, data, id);
        } catch (error) {
            console.error('Erro no update da Data:', error);
        }
    }

    return (
        <TableContainer component={Paper} >
            {
                !!user.admissao & user.admissao.length !== 0 ? (
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
                                        <TableCell>{<TextField defaultValue={item.obs} type='text' label='Obs' onChange={(elemento) => ativarObs(user._id, elemento.target.value, item.id)} />}</TableCell>
                                        <TableCell>
                                            <FormControl sx={{ minWidth: 150 }}>
                                                <InputLabel id='Status'>Status</InputLabel>
                                                <Select defaultValue={item.status} labelId="Status" id='Status' label='Status' onChange={(elemento) => handleChangeStatus(user._id, elemento.target.value, item.id)} >
                                                    <MenuItem value={'naoSeAplica'}>N/A</MenuItem>
                                                    <MenuItem value={'pendente'}>PENDENTE</MenuItem>
                                                    <MenuItem value={'emAndamento'}>EM ANDAMENTO</MenuItem>
                                                    <MenuItem value={'concluido'}>CONCLUIDO</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>{<TextField defaultValue={item.data} type='date' focused label='Data' onChange={(elemento) => ativarData(user._id, elemento.target.value, item.id)} />}</TableCell>
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