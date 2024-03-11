import React, { forwardRef, useEffect } from 'react';
import { AppBar, Box, Chip, CircularProgress, Container, Dialog, FormControlLabel, Slide, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useState } from 'react';
import { green, grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import ProducaoIndividual from '../../../../../components/ProducaoIndividual/ProducaoIndividualRsd/ProducaoIndividual';
import { getQuantidadeIndividualSindicancia, getQuantidadeSindicancias } from '../../../../../_services/sindicancia.service';
import ProducaoIndividualSindi from '../../../../../components/ProducaoIndividual/ProducaoIndividualSindi/ProducaoIndividualSindi';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SindicanciaTable = ({ mes }) => {

    const [tableData, setTableData] = useState([])
    const [loadingTabela, setLoadingTabela] = useState(false)
    const [dense, setDense] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [analistaSelecionado, setAnalistaSelecionado] = useState('')

    const getAnalistasSindicancia = async () => {
        try {
            setLoadingTabela(true)
            const result = await getQuantidadeIndividualSindicancia(mes)
            setTableData(result)
            console.log(result);
            setLoadingTabela(false)
        } catch (error) {
            console.log(error);
            setLoadingTabela(false)
        }
    }

    useEffect(() => {
        getAnalistasSindicancia()
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
                                        Quantidade de Pacotes
                                    </TableCell>
                                    <TableCell>
                                        Quantidade Demandas
                                    </TableCell>
                                    <TableCell>
                                        Quantidade de Fraudes
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
                                    Object.entries(tableData?.findPacote || {}).map((item, index) => (
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
                                                    alt={item[0]}
                                                    src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${item[0].split(' ').join('%20')}.jpg`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item[0]}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item[1]}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={tableData.findDemandaIndividual[item[0]]}
                                                />
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Ver detalhes">
                                                    <IconButton
                                                        onClick={() => {
                                                            setAnalistaSelecionado(item[0])
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
                    <ProducaoIndividualSindi
                        mes={mes}
                        analista={analistaSelecionado}
                        key={analistaSelecionado}
                    />
                </Container>
            </Dialog>

        </Box>

    )
}

export default SindicanciaTable