import React, { forwardRef, useEffect } from 'react';
import { AppBar, Box, Chip, CircularProgress, Container, Dialog, FormControlLabel, Slide, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useState } from 'react';
import { green, grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import ProducaoIndividualSindi from '../../../../../components/ProducaoIndividual/ProducaoIndividualSindi/ProducaoIndividualSindi';
import { getPedidosPorResponsavel } from '../../../../../_services/sulAmerica.service';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SulAmericaTable = ({ dataInicio, dataFim }) => {

    const [tableData, setTableData] = useState([])
    const [loadingTabela, setLoadingTabela] = useState(false)
    const [dense, setDense] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [analistaSelecionado, setAnalistaSelecionado] = useState('')

    const getAnalistasSulAmerica = async () => {
        try {
            setLoadingTabela(true)
            const resultPorColaborador = await getPedidosPorResponsavel(dataInicio, dataFim)
            setTableData(resultPorColaborador)
            console.log(resultPorColaborador);
            setLoadingTabela(false)
        } catch (error) {
            console.log(error);
            setLoadingTabela(false)
        }
    }

    useEffect(() => {
        getAnalistasSulAmerica()
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

                        >
                            <Typography variant="h6" sx={{
                                mt: 2,
                                mb: 1,
                            }}>
                                Média Analistas Sindicância
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
                                maxWidth: '100%',
                                mb: 5,
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
                                        Com Sucesso
                                    </TableCell>
                                    <TableCell>
                                        Sem Sucesso
                                    </TableCell>
                                    <TableCell>
                                        Agendada
                                    </TableCell>
                                    <TableCell>
                                        1° tentativa
                                    </TableCell>
                                    <TableCell>
                                        2° tentativa
                                    </TableCell>
                                    <TableCell>
                                        3° tentativa
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tableData?.map((item, index) => (
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
                                                    alt={item.responsavel}
                                                    src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${item.responsavel.split(' ').join('%20')}.jpg`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.responsavel}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.total}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.sucessoContato}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.insucessoContato}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.agendado}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.tentativa1}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.tentativa2}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.tentativa3ouMais}
                                                />
                                            </TableCell>
                                            <TableCell>
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
            </Dialog>

        </Box>

    )
}

export default SulAmericaTable