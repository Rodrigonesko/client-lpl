import React, { forwardRef, useEffect } from 'react';
import { AppBar, Box, CircularProgress, Container, Dialog, FormControlLabel, Slide, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useState } from 'react';
import { grey } from '@mui/material/colors';
import ProducaoIndividualAgendamento from '../../../../../components/ProducaoIndividual/ProducaoIndividualAgendamento';
import CloseIcon from '@mui/icons-material/Close';
import { ArrowDownward } from '@mui/icons-material';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const PropostasTable = ({ mes, data }) => {

    const [tableData, setTableData] = useState([])
    const [loadingTabela, setLoadingTabela] = useState(false)
    const [dense, setDense] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [analistaSelecionado, setAnalistaSelecionado] = useState('')
    const [key, setKey] = useState('')

    useEffect(() => {
        const fetch = async () => {
            setTableData(data.producao)
            console.log(data);
        }
        fetch()
    }, [mes, data])

    const handleSort = (key) => {
        const sorted = [...tableData].sort((a, b) => b[key] - a[key])
        setTableData(sorted)
    }

    return (
        <Box>
            {
                loadingTabela ? (
                    <Box
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer
                        sx={{
                            mt: 2,
                        }}
                    >
                        <Box
                            mb={2}
                        >
                            <FormControlLabel control={<Switch
                                checked={dense}
                                onChange={(e) => setDense(e.target.checked)}
                            />} label="Dense" />
                        </Box>
                        <Box
                            sx={{
                                mb: 1,
                            }}
                        >
                            <Typography variant="h6" sx={{
                                mt: 2,
                                mb: 1,
                            }}>
                                Média Analistas Agendamentos
                            </Typography>
                        </Box>
                        <Table
                            sx={{
                                minWidth: 650,
                            }}
                            size={dense ? 'small' : 'medium'}
                        >
                            <TableHead>
                                <TableRow
                                    sx={{
                                        backgroundColor: '#F5F5F5',
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            width: 50,
                                        }}
                                    >
                                    </TableCell>
                                    <TableCell>
                                        Nome
                                    </TableCell>
                                    <TableCell>
                                        Anexos
                                        <IconButton
                                            size='small'
                                            onClick={() => {
                                                handleSort('totalAnexos')
                                                setKey('totalAnexos')
                                            }}
                                            color={key === 'totalAnexos' ? 'primary' : 'default'}
                                        >
                                            <ArrowDownward />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell
                                    >
                                        Implantação
                                        <IconButton
                                            size='small'
                                            onClick={() => {
                                                handleSort('totalImplantacao')
                                                setKey('totalImplantacao')
                                            }}
                                            color={key === 'totalImplantacao' ? 'primary' : 'default'}
                                        >
                                            <ArrowDownward />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        Implantadas
                                        <IconButton
                                            size='small'
                                            onClick={() => {
                                                handleSort('totalImplantados')
                                                setKey('totalImplantados')
                                            }}
                                            color={key === 'totalImplantados' ? 'primary' : 'default'}
                                        >
                                            <ArrowDownward />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        Soma Anexos + Implantação
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tableData.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell
                                                sx={{
                                                    width: 50,
                                                }}
                                            >
                                                <Avatar
                                                    alt={item.analista}
                                                    src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${item.analista.split(' ').join('%20')}.jpg`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {item.analista}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {item.totalAnexos}
                                            </TableCell>
                                            <TableCell>
                                                {item.totalImplantacao}
                                            </TableCell>
                                            <TableCell>
                                                {item.totalImplantados}
                                            </TableCell>
                                            <TableCell>
                                                {item.totalAnexos + item.totalImplantacao}
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Detalhes">
                                                    <IconButton
                                                        onClick={() => {
                                                            setAnalistaSelecionado(item.analista)
                                                            setOpenDialog(true)
                                                        }}
                                                    >
                                                        <AnalyticsIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
            <Dialog
                fullScreen
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        sx={{
                            bgcolor: grey[500]
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setOpenDialog(false)}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Produção - {analistaSelecionado}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container>
                    <ProducaoIndividualAgendamento
                        mes={mes}
                        analista={analistaSelecionado}
                        key={analistaSelecionado}
                    />
                </Container>
            </Dialog>
        </Box>
    )
}

export default PropostasTable