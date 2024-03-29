
// Dependencias
import React, { forwardRef, useEffect } from 'react';
import { AppBar, Box, Chip, CircularProgress, Container, Dialog, FormControlLabel, Slide, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useState } from 'react';
import { blue, green, grey } from '@mui/material/colors';
import { getProducaoAnalistasAgendamento } from '../../../../../_services/teleEntrevistaExterna.service';
import CloseIcon from '@mui/icons-material/Close';
import ProducaoIndividualAgendamento from '../../../../../components/ProducaoIndividual/ProducaoIndividualAgendamento';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const AnaliticoTable = ({ mes }) => {

    const [tableData, setTableData] = useState([])
    const [loadingTabela, setLoadingTabela] = useState(false)
    const [dense, setDense] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [analistaSelecionado, setAnalistaSelecionado] = useState('')

    useEffect(() => {
        const fetch = async () => {
            setLoadingTabela(true)
            const result = await getProducaoAnalistasAgendamento(mes)
            setTableData(result)
            setLoadingTabela(false)
        }
        fetch()
    }, [])

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
                            {/* <Chip
                                label={`Média Total: ${media.toFixed(2)}`}
                                sx={{
                                    backgroundColor: blue[100],
                                    color: blue[800],
                                    fontWeight: 'bold'
                                }}
                            /> */}
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
                                        Quantidade
                                    </TableCell>
                                    <TableCell>
                                        Média/Dia util
                                    </TableCell>
                                    <TableCell>
                                        Produção
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
                                            <TableCell>
                                                <Avatar
                                                    src={item.foto}
                                                    sx={{
                                                        width: 30,
                                                        height: 30,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {item._id}
                                            </TableCell>
                                            <TableCell>
                                                {item.total}
                                            </TableCell>
                                            <TableCell>
                                                {item.media.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Ver detalhes">
                                                    <IconButton
                                                        onClick={() => {
                                                            setAnalistaSelecionado(item._id)
                                                            setOpenDialog(true)
                                                        }}
                                                    >
                                                        <AnalyticsIcon sx={{
                                                            color: green[500],
                                                        }} />
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

export default AnaliticoTable;