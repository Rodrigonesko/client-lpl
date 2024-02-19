import { Box, Button, Chip, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import ExpandIcon from '@mui/icons-material/Expand';
import { useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Demandas = () => {

    const [fullWidth, setFullWidth] = useState(true)

    return (
        <Sidebar>
            <Container maxWidth={fullWidth ? '' : 'lg'}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                width: '30%',
                                height: '2px',
                                bottom: 0,
                                left: '0%',
                                backgroundColor: 'currentColor',
                                transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                            },
                            '&:hover::after': {
                                width: '100%',
                                left: '0%',
                            },
                        }}
                    >
                        Demandas
                    </Typography>
                    <Tooltip title={fullWidth ? 'Minimizar' : 'Maximizar'}>
                        <IconButton onClick={() => setFullWidth(!fullWidth)}>
                            <ExpandIcon sx={{
                                transition: 'transform 0.3s ease-in-out',
                                transform: fullWidth ? 'rotate(180deg)' : 'rotate(90deg)',
                            }} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignContent: 'center',
                    mt: 2
                }}>
                    <TextField type='text' variant='standard' label='Área/Empresa' size='small' sx={{ mr: 4 }} />
                    <TextField type='text' variant='standard' label='Tipo de Serviço' size='small' sx={{ mr: 4 }} />
                    <TextField type='text' variant='standard' label='Status' size='small' sx={{ mr: 4 }} />
                    <TextField type='text' variant='standard' label='Analista Executor' size='small' sx={{ mr: 4 }} />
                    <TextField type='text' variant='standard' label='Data' focused size='small' sx={{ mr: 4 }} />
                </Box>
                <Box sx={{
                    mt: 2
                }}>
                    <Chip
                        label={`Total de Registros Apresentados: ${12}`}
                        color='success'
                        sx={{ fontSize: 15 }}
                    />
                </Box>
                <Box sx={{
                    mt: 2
                }}>
                    <TextField type='text' variant='standard' label='Pesquisar' size='small' />
                </Box>
                <Box sx={{
                    mt: 4
                }}>
                    <TableContainer component={Paper} >
                        <Table size='small' >
                            <TableHead>
                                <TableRow className="table-header">
                                    <TableCell>CÓDIGO</TableCell>
                                    <TableCell>TIPO DE INVESTIGAÇÃO</TableCell>
                                    <TableCell>NOME INVESTIGADO</TableCell>
                                    <TableCell>ESPECIALIDADE</TableCell>
                                    <TableCell>FRENTE</TableCell>
                                    <TableCell>STATUS</TableCell>
                                    <TableCell>DATA DE INÍCIO</TableCell>
                                    <TableCell>DATA ULTIMA ATUALIZAÇÃO</TableCell>
                                    <TableCell>DIAS SEM ATUALIZAÇÃO</TableCell>
                                    <TableCell>EMPRESA/ÁREA</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell>1</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>4</TableCell>
                                <TableCell>5</TableCell>
                                <TableCell>6</TableCell>
                                <TableCell>7</TableCell>
                                <TableCell>8</TableCell>
                                <TableCell>9</TableCell>
                                <TableCell>10</TableCell>
                                <TableCell><Button variant='contained' sx={{ borderRadius: '25px' }}><MoreHorizIcon /></Button></TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer >
                </Box>
            </Container>
        </Sidebar>
    )
}

export default Demandas