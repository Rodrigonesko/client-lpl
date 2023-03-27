import React from 'react'
import { Card, CardContent, Typography, Box, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

const ProducaoDiariaMui = ({ producao, total, setData, buscarDadosData, title }) => {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h6" align='center'>
                        Produção Diaria {title}
                    </Typography>
                    <Box m={1} display='flex' justifyContent='center'>
                        <TextField type='date' size="small" onChange={e => { setData(e.target.value) }} focused label='Data' />
                        <Button variant="contained" size="small" onClick={buscarDadosData} >Buscar</Button>
                    </Box>
                    <Table>
                        <TableHead >
                            <TableRow>
                                <TableCell>Analista</TableCell>
                                <TableCell>Quantidade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                producao.map(item => {
                                    return (
                                        <TableRow key={item._id}>
                                            <TableCell>{item.analista}</TableCell>
                                            <TableCell>{item.quantidade}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                            <TableRow key={'total'}>
                                <TableCell>Total</TableCell>
                                <TableCell>{total}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

export default ProducaoDiariaMui