import { Box, Button, Chip, Container, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import ExpandIcon from '@mui/icons-material/Expand';
import { useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { blue } from "@mui/material/colors";

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
                    <FormControl>
                        <InputLabel>Área/Empresa</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            sx={{ width: '200px', mr: 4, borderRadius: '20px' }}
                        >
                            <MenuItem>1</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Tipo de Serviço</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            sx={{ width: '200px', mr: 4, borderRadius: '20px' }}
                        >
                            <MenuItem>1</MenuItem>

                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            sx={{ width: '200px', mr: 4, borderRadius: '20px' }}
                        >
                            <MenuItem>1</MenuItem>

                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Analista Executor</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            sx={{ width: '200px', mr: 4, borderRadius: '20px' }}
                        >
                            <MenuItem>1</MenuItem>

                        </Select>
                    </FormControl>
                    <TextField type='date' variant='outlined' label='Data' focused sx={{ mr: 4, borderRadius: '20px' }} />
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
                    <TextField type='text' variant='outlined' label='Pesquisar' />
                </Box>
                <Box sx={{
                    mt: 4
                }}>
                    <TableContainer component={Paper} >
                        <Table size='small' >
                            <TableHead>
                                <TableRow className="table-header">
                                    <TableCell>Código</TableCell>
                                    <TableCell>Tipo de Investigação</TableCell>
                                    <TableCell>Nome Investigado</TableCell>
                                    <TableCell>Especialidade</TableCell>
                                    <TableCell>Frente</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Data de Início</TableCell>
                                    <TableCell>Data Ultima Atualização</TableCell>
                                    <TableCell>Dias sem Atualização</TableCell>
                                    <TableCell>Empresa/Área</TableCell>
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