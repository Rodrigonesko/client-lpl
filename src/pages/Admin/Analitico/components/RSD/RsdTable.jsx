import React, { forwardRef, useEffect } from 'react';
import { AppBar, Box, Chip, CircularProgress, Container, Dialog, FormControlLabel, Slide, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useState } from 'react';
import { green, grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import ProducaoIndividualRsd from '../../../../../components/ProducaoIndividual/ProducaoIndividualRsd/ProducaoIndividual';
import { producaoIndividualRsd } from '../../../../../_services/rsd.service';
import moment from 'moment';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const RsdTable = ({ mes }) => {

    const [tableData, setTableData] = useState([])
    const [loadingTabela, setLoadingTabela] = useState(false)
    const [dense, setDense] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [analistaSelecionado, setAnalistaSelecionado] = useState('')

    const getAnalistasRsd = async () => {
        try {
            setLoadingTabela(true)

            const dataInicio = moment(mes).startOf('month').format('YYYY-MM-DD')
            const dataFim = moment(mes).endOf('month').format('YYYY-MM-DD')

            console.log(dataInicio, dataFim);

            const result = await producaoIndividualRsd(dataInicio, dataFim)
            console.log(result);
            setTableData(result)
            setLoadingTabela(false)
        } catch (error) {
            console.log(error);
            setLoadingTabela(false)
        }
    }

    useEffect(() => {
        getAnalistasRsd()
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
                                Média Analistas RSD
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
                                mb: 2
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
                                        Total
                                    </TableCell>
                                    <TableCell>
                                        Cancelados
                                    </TableCell>
                                    <TableCell>
                                        Indeferidos
                                    </TableCell>
                                    <TableCell>
                                        Aguardando Comprovante
                                    </TableCell>
                                    <TableCell>
                                        Aguardando Retorno Contato
                                    </TableCell>
                                    <TableCell>
                                        Comprovante Correto
                                    </TableCell>
                                    <TableCell>
                                        Devolvido Amil
                                    </TableCell>
                                    <TableCell>
                                        Pago pela Amil sem Comprovante
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
                                            <TableCell
                                                sx={{
                                                    width: 50
                                                }}
                                            >
                                                <Avatar
                                                    alt={item.analista}
                                                    src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${item.analista.split(' ').join('%20')}.jpg`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.analista}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.total}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.cancelados}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.indeferidos}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.aguardandoComprovante}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.aguardandoRetornoContato}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.comprovanteCorreto}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.devolvidoAmil}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.pagoPelaAmilSemComprovante}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Ver detalhes">
                                                    <IconButton
                                                        onClick={() => {
                                                            setAnalistaSelecionado(item.analista)
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
                    <ProducaoIndividualRsd
                        mes={mes}
                        analista={analistaSelecionado}
                        key={analistaSelecionado}
                    />
                </Container>
            </Dialog>

        </Box>
    )
}

export default RsdTable;